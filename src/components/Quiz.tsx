import React, {useEffect, useRef, useState, useCallback} from 'react';
import {QuizItem} from '../types/QuizItem'
import {QuizMaker} from '../utils/QuizMaker'
import pickRandom from '../utils/pickRandom'
import { IoVolumeMediumOutline } from 'react-icons/io5';
import {Button, Flex} from "./Layout";
import templates from '../data/quiz-templates.json'
import { IoEllipseOutline, IoClose } from 'react-icons/io5';
import shuffleArray from '../utils/shuffleArray';
import createIndexArray from "../utils/createIndexArray";
import * as styles from './Quiz.module.css'
import {generateAnnotationForScore} from "../utils/generateAnnotationForScore"
import {useDispatch} from "./Dispatcher";

interface QuizAnswerHandlerProps {
    answers: string[];
    answerAnnotations? : [string, string][];
    reportEvent: (event: string) => void;
    initialScore?: number;
    type?: 'text' | 'audio';
    link?: string;
}


const QuizAnswerHandler: React.FC<QuizAnswerHandlerProps> = ({
                                                                 answers,
                                                                 answerAnnotations,
                                                                 reportEvent,
                                                                 type,
                                                                 link
                                                             }) => {
    const shuffledAnswerIndices = useRef(shuffleArray(createIndexArray(answers.length)))
    const [selectedAnswerIndices, setSelectedAnswerIndices] = useState<number[]>([]);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const { active, activate } = useDispatch();

    useEffect(() => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setAudio(null)
        }
    }, [active]);

    useEffect(() => {
        if (type && link && type === 'audio') {
            const audioElement = new Audio(link);
            audioElement.loop = true;
            setAudio(audioElement);
            audioElement.play()
                .then(() => {
                    if (audio) {
                        audio.currentTime = Math.random() * audio.duration;
                    }
                })
                .catch((error) => {
                    if ('name' in error && (error as any).name === 'NotSupportedError') {
                        reportEvent('correct');
                    } else {
                        console.error(error.name, error, link);
                    }
                });
        }
    }, [type, link]);

    useEffect(() => {
        const interval = setInterval(() => {
            reportEvent('tick')
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        shuffledAnswerIndices.current = shuffleArray(shuffledAnswerIndices.current);
        setSelectedAnswerIndices([]);
    }, [answers]);

    const handleAnswerClick = (index: number) => {
        if (index == 0) {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
            reportEvent('correct')
        } else {
            setSelectedAnswerIndices((arr) => [...arr, index])
            reportEvent('incorrect')
        }
    };

    return (
        <div>
            {shuffledAnswerIndices.current.map((index) => (
                <div key={index} className={styles.row} onClick={() => handleAnswerClick(index)}>
                    {selectedAnswerIndices.includes(index) ? <IoClose className={styles.icon}/> : <IoEllipseOutline className={styles.icon}/>}
                    {answerAnnotations ?
                        <div className={styles.answer}>
                            <div className={styles.answerWithAnnotation}>{answers[index]}</div>
                            <div className={styles.annotation}>-- {answerAnnotations[index]}</div>
                        </div>
                    :
                        <div className={styles.answer}>{answers[index]}</div>
                    }
                </div>
            ))}
        </div>
    );
};


interface QuizProps {
    buttonLabel: string
    quizMakerObj: QuizMaker;
}

function composeQuestion(question: string|[string, {[key: string]: string}]) {
    if (typeof question === 'string') {
        if (templates["question-types"][question]) {
            return pickRandom(templates["question-types"][question])
        } else {
            return question
        }
    } else {
        let rv = pickRandom(templates["question-types"][question[0]])

        for (let key in question[1]) {
            rv = rv.replace('{' + key + '}', '<b>' + question[1][key] + '</b>')
        }

        return rv
    }
}

function composeAnnotation(subject: string|undefined, annotationTemplates: any) {
    if (subject) {
        if (annotationTemplates && subject in annotationTemplates) {
            return pickRandom(annotationTemplates[subject])
        }

        if (subject in templates['annotations']) {
            return pickRandom(templates['annotations'][subject])
        }
    }
    return undefined
}

function composeAnnotations(subjects: string[]|undefined, annotationTemplates: any) {
    //if (subjects && annotationTemplates) {
    //    return subjects.map((subject) => composeAnnotation(subject, annotationTemplates))
    //}
    return undefined
}



const Quiz: React.FC<QuizProps> = ({ buttonLabel, quizMakerObj}) => {
    const annotationTemplates = quizMakerObj.getAnnotationTemplates()
    const [items, setItems] = useState(() => quizMakerObj.getItems())
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [state, setState] = useState('idle')
    const [ticks, setTicks] = useState(0)
    const [score, setScore] = useState(0)
    const [question, setQuestion] = useState(() => composeQuestion(items[currentItemIndex].question))
    const { active, activate } = useDispatch();
    const [questionAnnotation, setQuestionAnnotation] = useState(() => {
        console.log(items[currentItemIndex])
        composeAnnotation(items[currentItemIndex].questionAnnotation, annotationTemplates)}
    )
    const [answerAnnotations, setAnswerAnnotations] = useState(() =>
        composeAnnotations(items[currentItemIndex].answerAnnotations, annotationTemplates)
    )

    useEffect(() => {
        if (active !== buttonLabel && state !== 'idle') {
            setState('idle');
            setTicks(0)
            setScore(0)
        }
    }, [active]);

    const reportEvent = (event: string) => {
        if (event == 'correct') {
            setScore((prevScore) => prevScore + 100)
            let newCurrentItemIndex = currentItemIndex + 1

            if (newCurrentItemIndex == items.length) {
                setItems(shuffleArray(items))
                newCurrentItemIndex = 0
                setState('finished')
            }

            setTicks(0)
            setCurrentItemIndex(newCurrentItemIndex)
        }

        if (event == 'incorrect') {
            setScore((prevScore) => prevScore > 50 ? prevScore - 50 : 0)
        }

        if (event == 'tick' && state == 'running') {
            setScore((prevScore) => prevScore ? prevScore - 1 : 0)
            setTicks((prevTicks) => prevTicks + 1)
        }
    }

    useEffect(() => {
        if (ticks && ticks % 2 === 0) {
            setQuestionAnnotation(composeAnnotation(items[currentItemIndex].questionAnnotation, annotationTemplates))
        }
    }, [ticks]);

    useEffect(() => {
        setQuestion(composeQuestion(items[currentItemIndex].question))
        setQuestionAnnotation(composeAnnotation(items[currentItemIndex].questionAnnotation, annotationTemplates))
        setAnswerAnnotations(composeAnnotations(items[currentItemIndex].answerAnnotations, annotationTemplates))
    }, [currentItemIndex]);

    const startQuiz = () => {
        activate(buttonLabel)
        setState('running')
    }

    const resetQuiz = () => {
        setTicks(0)
        setScore(0)
        setState('running')
    }

    return (
        <div className={styles.quiz}>
            {state == 'idle' ? (
                <div>
                    <Button action={startQuiz}>{buttonLabel ? buttonLabel : 'Go Quiz!'}</Button>
                </div>
            ) : (state == 'running' ? (
                <div>
                    <div className={styles.score}>
                        <span className={styles.score_label}>Score: </span>
                        <span className={styles.score_value}>{score < 0 ? 0 : score}</span>
                    </div>
                    {questionAnnotation &&
                        <div className={styles.questionAnnotation}>
                            -- {questionAnnotation}{items[currentItemIndex].link && <IoVolumeMediumOutline className={styles.speaker}/>} --
                        </div>
                    }
                    <div className={styles.question}>
                        <span dangerouslySetInnerHTML={{ __html: question }} />
                    </div>
                    <QuizAnswerHandler
                        answers={items[currentItemIndex].answers}
                        answerAnnotations={answerAnnotations}
                        type={items[currentItemIndex].type}
                        link={items[currentItemIndex].link}
                        reportEvent={reportEvent}
                    />
                </div>
            ) : (
                <Flex className='flex-column-space-around'>
                    <div>
                        <div className={styles.endOfQuizLabel}>QUIZ COMPLETED</div>
                        <div>Score: {Math.max(score, 0)}</div>
                        <div className={styles.endOfQuizAnnotations}>
                            {generateAnnotationForScore(score, items.length * 100).map((line, index) => (
                                <div key={index} className={styles.endOfQuizAnnotation}>{line}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button action={resetQuiz}>Retake Quiz</Button>
                    </div>
                </Flex>
            ))}
        </div>
    )
};

export default Quiz
