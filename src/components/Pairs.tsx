import React, { useState, useEffect, useRef } from 'react';
import * as styles from './Pairs.module.css';
import {Button, Flex} from "./Layout";
import {Pair} from "../types/Pair.ts"
import {generateAnnotationForScore} from "../utils/generateAnnotationForScore"


const Pairs: React.FC<PairsProps> = ({ buttonLabel, pairsMakerObj }) => {
    const [timer, setTimer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [state, setState] = useState('idle')
    const pairs = useRef(pairsMakerObj.get(1))
    const numPairs = pairs.current.reduce((acc, curr) => acc + curr.length, 0);

    const [states, setStates] = useState({
        'A': new Array(pairs.current[0].length).fill('inactive'),
        'B': new Array(pairs.current[0].length).fill('inactive'),
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

    const refs = { 'A': new Array(pairs.current[round].length).fill(-1), 'B': new Array(pairs.current[round].length).fill(-1) }

    pairs.current[round].forEach((dict, index) => {
        refs['A'][dict.indexA] = index;
        refs['B'][dict.indexB] = index;
    });

    const isRoundFinished = () => {
        console.log("states['A']", states['A'])
        return states['A'].findIndex(state => state != 'match' && state != 'disabled') === -1
    }

    const handleFinishedRound = () => {
        const isLast = round + 1 == pairs.current.length

        setStates({
            'A': new Array(pairs.current[isLast ? 0 : round + 1].length).fill('inactive'),
            'B': new Array(pairs.current[round].length).fill('inactive'),
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

        if (isRoundFinished()) {
            handleFinishedRound()
        } else {
            let newStates = {...states}
            newStates['A'] = newStates['A'].map(prevState => prevState === 'match' ? 'disabled' : prevState)
            newStates['B'] = newStates['B'].map(prevState => prevState === 'match' ? 'disabled' : prevState)
            newStates['current'] = 'inactive'
            setStates(newStates)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (state === 'running') {
                setScore(prevScore => prevScore > 0 ? prevScore - 1 : 0)
            }
        }, 1000);
        return () => {
            clearInterval(interval);

            if (timer) {
                window.clearTimeout(timer);
            }
        }
    }, []);

    const handleAreaClick = () => {
        if (isRoundFinished()) {
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
                    setExplanations(prev => [pairs.current[round][refs[type][index]], ...prev])
                    newStates[type][index] = 'match'
                    newStates[otherType][otherIndex] = 'match'
                    newStates['current'] = 'match'
                    setScore(prevScore => prevScore + 100)
                    startTimer()
                } else {
                    newStates[type][index] = 'mismatch'
                    newStates[otherType][otherIndex] = 'mismatch'
                    newStates['current'] = 'mismatch'
                    setScore(prevScore => prevScore > 50 ? prevScore - 50 : 0)
                }
            }
        } else {
            newStates[type][index] = 'selected'
            newStates['current'] = 'selected'
            newStates['current'] = 'selected'
        }

        setStates(newStates)

    }

    const start = () => {
        setState('running')
    }

    const reset = () => {
        startTimer()
        pairs.current = pairsMakerObj.get()
        setScore(0)
        setState('running')
    }
    return (
        (state === 'idle') ? (
            <div>
                <Button action={start}>{buttonLabel ? buttonLabel : 'Pair the Pieces'}</Button>
            </div>
        ) : (state == 'running' ? (
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
                <div className={styles.areas}>
                    <div className={styles.area}>
                        {refs['A'].map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.button} ${classes[states['A'][index]]}`}
                                onClick={(e) => handleButtonClick(e, 'A', index)}
                            >
                                {pairs.current[round][refs['A'][index]].a}
                            </div>
                        ))}
                    </div>

                    <div className={styles.area}>
                        {refs['B'].map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.button} ${classes[states['B'][index]]}`}
                                onClick={(e) => handleButtonClick(e, 'B', index)}
                            >
                                {pairs.current[round][refs['B'][index]].b}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.explanations}>
                    {explanations.length > 0 &&
                    <div>-- Explanations --
                    <ul className={styles.explanationList}>
                           {explanations.map((e, index) => (
                               <li key={index}><b>{e.a}</b> and <b>{e.b}</b>: {e.explanation}</li>
                                   ))}
                    </ul>
                    </div>}
                </div>
            </div>
        ) : (
            <Flex className='flex-column-space-around'>
                <div>
                    <div className={styles.endOfPairMatchingLabel}>PAIR MATCHING COMPLETED</div>
                    <div>Score: {Math.max(score, 0)}</div>
                    <div className={styles.endOfPairMatchingAnnotations}>
                        {generateAnnotationForScore(score, numPairs * 100).map((line, index) => (
                            <div key={index} className={styles.endOfPairMatchingAnnotation}>{line}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <Button action={reset}>Try Again</Button>
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
            </Flex>
        ))
    );
}

export default Pairs;
