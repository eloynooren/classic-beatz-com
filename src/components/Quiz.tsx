import React, {useEffect, useRef, useState} from 'react';
import {QuizItem} from '../types/QuizItem'
import pickRandom from '../utils/pickRandom'
import { IoVolumeMediumOutline } from 'react-icons/io5';
import {Button, Flex} from "./Layout";
import templates from '../data/quiz-templates.json'
import { IoEllipseOutline, IoClose } from 'react-icons/io5';
import shuffleArray from '../utils/shuffleArray';
import createIndexArray from "../utils/createIndexArray";
import * as styles from './Quiz.module.css'



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
                <div key={index}>
                    <div className={styles.row} onClick={() => handleAnswerClick(index)}>
                        <div className={styles.icon}>
                            {selectedAnswerIndices.includes(index) ? <IoClose /> : <IoEllipseOutline />}
                        </div>
                        <div className={styles.answerAndAnnotation}>
                            <div className={styles.answer}>{answers[index]}</div>
                            <div className={styles.annotation}>-- {answerAnnotations[index]}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


interface QuizProps {
    items: QuizItem[];
    annotationTemplates: any;
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
        if (subject in annotationTemplates) {
            return pickRandom(annotationTemplates[subject])
        }

        if (subject in templates['annotations']) {
            return pickRandom(templates['annotations'][subject])
        }
    }
    return '&nbsp'
}

function composeAnnotations(subjects: string[]|undefined, annotationTemplates: any) {
    if (subjects) {
        return subjects.map((subject) => composeAnnotation(subject, annotationTemplates))
    }
    return undefined
}



const Quiz: React.FC<QuizProps> = ({ items, annotationTemplates}) => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [running, setRunning] = useState(true)
    const ticks = useRef(0)
    const [score, setScore] = useState(0)
    const [question, setQuestion] = useState(composeQuestion(items[currentItemIndex].question))
    const [questionAnnotation, setQuestionAnnotation] = useState(
        composeAnnotation(items[currentItemIndex].questionAnnotation, annotationTemplates)
    )
    const [answerAnnotations, setAnswerAnnotations] = useState(
        composeAnnotations(items[currentItemIndex].answerAnnotations, annotationTemplates)
    )

    const reportEvent = (event: string) => {
        if (event == 'correct') {
            setScore((prevScore) => prevScore + 100)
            let newCurrentItemIndex = currentItemIndex + 1

            if (newCurrentItemIndex == items.length) {
                items = shuffleArray(items)
                console.log(items)
                newCurrentItemIndex = 0
                setRunning(false)
            }

            setCurrentItemIndex(newCurrentItemIndex)
            setQuestion(composeQuestion(items[newCurrentItemIndex].question))
            setQuestionAnnotation(composeAnnotation(items[newCurrentItemIndex].questionAnnotation, annotationTemplates))
            setAnswerAnnotations(composeAnnotations(items[newCurrentItemIndex].answerAnnotations, annotationTemplates))
        }

        if (event == 'incorrect') {
            setScore((prevScore) => prevScore > 50 ? prevScore - 50 : 0)
        }

        if (event == 'tick') {
            setScore((prevScore) => prevScore ? prevScore - 1 : 0)
            ticks.current += 1

            if (ticks % 2 === 0) {
                setQuestionAnnotation(composeAnnotation(items[currentItemIndex].questionAnnotation, annotationTemplates))
            }
        }

    }

    const generateAnnotationForScore = () => {
        const end_score = Math.max(score, 0)
        const rank = Math.ceil(end_score / items.length)
        let group
        let rank_line

        if (rank <= 1) {
            group = 'worst'
            rank_line = "Bottom 1%."
        } else if (rank < 50) {
            group = 'bad'
            rank_line = "You lose to " + String(100-rank) +  "% of other quiz-takers."
        } else if (rank < 90) {
            group = 'reasonable'
            rank_line = "You beat " + String(rank) + "% of other quiz-takers."
        } else if (rank < 99) {
            group = 'good'
            rank_line = "Top " + String(100-rank) + "%."
        } else {
            group = 'best'
            rank_line = "Top 1%."
        }

        let score_jibe = pickRandom(templates.feedback[group]['score-jibe']).replace('SCORE', end_score)
        let cheer = pickRandom(templates.feedback[group]['cheer'])

        return [score_jibe, rank_line, cheer]
    }

    const resetQuiz = () => {
        setScore(0)
        setRunning(true)
    }

    if (currentItemIndex < items.length) {
        const currentItem = items[currentItemIndex];

        return (
            <div className={styles.quiz}>
                {running ? (
                    <div>
                        <div className={styles.score}>
                            <span className={styles.score_label}>Score: </span>
                            <span className={styles.score_value}>{score < 0 ? 0 : score}</span>
                        </div>
                        <div className={styles.questionAnnotation}>
                            -- {questionAnnotation}{currentItem.link && <IoVolumeMediumOutline className={styles.speaker}/>} --
                        </div>
                        <div className={styles.question}>
                            <span dangerouslySetInnerHTML={{ __html: question }} />
                        </div>
                        <QuizAnswerHandler
                            answers={currentItem.answers}
                            answerAnnotations={answerAnnotations}
                            type={currentItem.type}
                            link={currentItem.link}
                            reportEvent={reportEvent}
                        />
                    </div>
                ) : (
                    <Flex className='flex-column-space-around'>
                        <div>
                            <div className={styles.endOfQuizLabel}>QUIZ COMPLETED</div>
                            <div>Score: {Math.max(score, 0)}</div>
                            <div className={styles.endOfQuizAnnotations}>
                                {generateAnnotationForScore().map((line, index) => (
                                    <div key={index} className={styles.endOfQuizAnnotation}>{line}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Button action={resetQuiz}>Retake Quiz</Button>
                        </div>
                    </Flex>
                )}
            </div>
        )
    } else {
        return (<h2>Final Score: {score}</h2>)
    }
};

export default Quiz
