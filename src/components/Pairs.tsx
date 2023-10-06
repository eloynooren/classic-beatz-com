import React, { useState, useEffect } from 'react';
import * as styles from './Pairs.module.css';


interface PairsProps {
    pairs: {
        indexA: number;
        indexB: number;
        a: string;
        b: string;
        explanation: string;
    }[][];
}


const Pairs: React.FC<PairsProps> = ({ pairs }) => {
    const [timer, setTimer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [state, setState] = useState('idle')
    const [states, setStates] = useState({
        'A': new Array(pairs[0].length).fill('inactive'),
        'B': new Array(pairs[0].length).fill('inactive'),
        'current': 'inactive'
    })

    const [explanations, setExplanations] = useState([]);

    const classes = {
        'disabled': styles.buttonDisabled,
        'inactive': styles.buttonInactive,
        'selected': styles.buttonSelected,
        'mismatch': styles.buttonMismatch,
        'match': styles.buttonMatch
    }

    const refs = { 'A': new Array(pairs[round].length).fill(-1), 'B': new Array(pairs[round].length).fill(-1) }

    pairs[round].forEach((dict, index) => {
        refs['A'][dict.indexA] = index;
        refs['B'][dict.indexB] = index;
    });

    const isRoundFinished = () => {
        return states['A'].findIndex(state => state != 'match' && state != 'disabled') === -1
    }

    const handleFinishedRound = () => {
        const isLast = round + 1 == pairs.length

        setStates({
            'A': new Array(pairs[isLast ? 0 : round + 1].length).fill('inactive'),
            'B': new Array(pairs[round].length).fill('inactive'),
            'current': 'inactive'
        })

        if (isLast) {
            setState('finished')
        } else {
            setRound(prevRound => prevRound + 1)
        }
    }

    const startTimer = () => {
        if (timer) {
            window.clearTimeout(timer)
        }

        setTimer(window.setTimeout(handleTimerExpiry, 1000))
    }

    const stopTimer = () => {
        if (timer) {
            window.clearTimeout(timer);
        }
        setTimer(null);
    }

    const handleTimerExpiry = () => {
        stopTimer()

        if (isRoundFinished) {
            handleFinishedRound()
        } else {
            let newStates = {...states}
            newStates['A'] = newStates['A'].map(prevState => prevState === 'match' ? 'disabled' : prevState)
            newStates['B'] = newStates['B'].map(prevState => prevState === 'match' ? 'disabled' : prevState)
            newStates['current'] = 'inactive'
            console.log('before x', states)
            console.log('after x', newStates)
            setStates(newStates)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setScore(prevScore => prevScore > 0 ? prevScore - 1 : 0)
        }, 1000);
        return () => {
            clearInterval(interval);

            if (timer) {
                window.clearTimeout(timer);
            }
        }
    }, []);

    const handleAreaClick = () => {
        if (isRoundFinished) {
            handleFinishedRound()
        } else if (states['A'].findIndex(state => state == 'match') !== -1) {
            setStates(prevStates => ({
                'A': prevStates['A'].map((prevState, idx) => prevState === 'match' ? 'disabled' : prevState),
                'B': prevStates['B'].map((prevState, idx) => prevState === 'match' ? 'disabled' : prevState),
                'current': prevStates['current']
            }))
        } else {
            setStates(prevStates => ({
                'A': prevStates['A'].map((prevState, idx) => prevState !== 'disabled' ? 'inactive' : prevState),
                'B': prevStates['B'].map((prevState, idx) => prevState !== 'disabled' ? 'inactive' : prevState),
                'current': prevStates['current']
            }))
        }
    }

    const handleButtonClick = (event, type, index) => {
        if (states[type][index] === 'disabled') {
            // event propagates, handleArea will be invoked.
            return
        }

        event.stopPropagation()
        
        console.log('handleButtonClick', type, index)
        let newStates = {...states}

        if (states['current'] === 'match') {
            stopTimer()
            newStates['A'] =  newStates['A'].map (prevState => prevState === 'match' ? 'disabled' : prevState)
            newStates['B'] =  newStates['B'].map (prevState => prevState === 'match' ? 'disabled' : prevState)

            if (states[type][index] === 'inactive') {
                newStates[type][index] =  'selected'
                newStates['current'] = 'selected'
            } else {
                newStates['current'] = 'inactive'
            }
        } else if (states['current'] === 'mismatch') {
            newStates['A'] = newStates['A'].map(prevState => prevState === 'mismatch' ? 'inactive' : prevState)
            newStates['B'] = newStates['B'].map(prevState => prevState === 'mismatch' ? 'inactive' : prevState)
            newStates[type][index] = 'selected'
            newStates['current'] = 'selected'
        } else if (states['current'] === 'selected') {
            if (states[type].includes('selected')) {
                if (states[type][index] === 'selected') {
                    newStates[type][index] = 'inactive'
                    newStates['current'] = 'inactive'
                } else {
                    newStates[type] = newStates[type].map(prevState => prevState === 'selected' ? 'inactive' : prevState)
                    newStates[type][index] = 'selected'
                }
            } else {
                let otherType = (type == 'A') ? 'B' : 'A'
                let otherIndex = states[otherType].findIndex(state => state == 'selected')
                if (refs[type][index] === refs[otherType][otherIndex]) {
                    setExplanations(prev => [pairs[round][refs[type][index]], ...prev])
                    newStates[type][index] = 'match'
                    newStates[otherType][otherIndex] = 'match'
                    newStates['current'] = 'match'
                    setScore(prevScore => prevScore + 10)
                    startTimer()
                } else {
                    newStates[type][index] = 'mismatch'
                    newStates[otherType][otherIndex] = 'mismatch'
                    newStates['current'] = 'mismatch'
                    setScore(prevScore => prevScore > 5 ? prevScore - 5 : 0)
                }
            }
        } else {
            newStates[type][index] = 'selected'
            newStates['current'] = 'selected'
            newStates['current'] = 'selected'
        }
        console.log('pairs[round]', pairs[round])
        console.log('refs', refs)
        console.log('before', states)
        console.log('after', newStates)

        setStates(newStates)

    }

    return (
        <div className={styles.container} onClick={() => handleAreaClick()}>
            <div className={styles.stats}>
                <div>
                    <span className={styles.statsLabel}>Round: </span>
                    <span className={styles.statsValue}>{round+1}</span>
                </div>
                <div>
                    <span className={styles.statsLabel}>Score: </span>
                    <span className={styles.statsValue}>{score}</span>
                </div>
            </div>
            <div className={`${styles.areas}`}>
                <div className={`${styles.area}`}>
                    {refs['A'].map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.button} ${classes[states['A'][index]]}`}
                            onClick={(e) => handleButtonClick(e, 'A', index)}
                        >
                            {pairs[round][refs['A'][index]].a}
                        </div>
                    ))}
                </div>

                <div className={`${styles.area}`}>
                    {refs['B'].map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.button} ${classes[states['B'][index]]}`}
                            onClick={(e) => handleButtonClick(e, 'B', index)}
                        >
                            {pairs[round][refs['B'][index]].b}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`${styles.explanations}`}>
                {explanations.length > 0 &&
                <div>-- Explanations --
                <ul className={`${styles.explanationList}`}>
                       {explanations.map((e, index) => (
                           <li key={index}><b>{e.a}</b> and <b>{e.b}</b>: {e.explanation}</li>
                               ))}
                </ul>
                </div>}
            </div>
        </div>
    );
};

export default Pairs;
