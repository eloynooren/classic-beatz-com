import React, {ReactElement} from "react";
import {Paragraph} from './Layout'
import {AudioFragment} from './AudioFragment'
import * as styles from './Section.module.css'
import {QuizMaker} from "../utils/QuizMaker";
import Quiz from "./Quiz";
import Pairs from "./Pairs";
import  {Spotify} from 'react-spotify-embed';


interface SectionProps {
    paragraphs: string[][];
    type?: string;
    audio?: Record<number, string>;
    images: Record<string, ReactElement>
    quizIntro?: string[]
    quiz?: QuizMaker
    pairsIntro?: string[]
    pairs?: {[key: string]: { [key: string]: string; } }
    spotify?: string
}


export const Section: React.FC<SectionProps> = ({ paragraphs, type, audio , images, quizIntro, quiz, pairsIntro, pairs, spotify}) => {
    let numImages = 0
    const quizItems = quiz && quiz.getItems()
    const annotationTemplates = quiz && quiz.getAnnotationTemplates()

    const Image = (image: ReactElement) => {
        numImages += 1
        return image ? <div key={`image-${numImages}`} className={styles.imageContainer}>{image}</div> : null
    }

    const renderLines = () => {
        const elements = [];

        //elements.push(Image(images['before']))

        if (paragraphs) {

            for (let i = 0; i < paragraphs.length; i++) {
                const sentences = paragraphs[i];
                if (type === 'fragments' && sentences.length && /^#+\s?\d+/.test(sentences[0]) && audio) {
                    // Strip leading hashes and spaces
                    const number = parseInt(sentences[0].match(/\d+/)[0], 10); // Extract the number
                    elements.push(
                        <AudioFragment
                            key={`audio-fragment-${i}`}
                            heading={sentences[0]}
                            text={sentences.slice(1)}
                            src={audio["fragment-" + number.toString()]}
                        />
                    );
                } else {
                    if (sentences && !sentences[0].startsWith('//')) {
                        elements.push(
                            <Paragraph key={`paragraph-${i}`} sentences={sentences}
                                       classNames="paragraphJustify paragraphSpaceOutVertically"/>
                        );
                    }
                }
                //elements.push(Image(images[(i + 1).toString()]))
            }
        }

        //elements.push(Image(images['after']))

        if (quizIntro) {
            elements.push(
                <Paragraph key={`quiz-intro`} sentences={quizIntro}
                       classNames="paragraphJustify paragraphSpaceOutVertically"/>)
        }

        if (quiz) {
            elements.push(<Quiz key={"quiz"} quizItems={quizItems} annotationTemplates={annotationTemplates}/>)
        }

        if (pairsIntro) {
            elements.push(
                <Paragraph key={`pairs-intro`} sentences={pairsIntro}
                       classNames="paragraphJustify paragraphSpaceOutVertically"/>)
        }

        if (pairs) {
            elements.push(<Pairs key={"pairs"} pairs={pairs}/>)
        }

        if (spotify) {
            elements.push(<Spotify className={styles.spotify} link={spotify}/>)
        }
        console.log(elements)

        return elements;
    };

    return <div className={styles.section}>{renderLines()}</div>;
};

export default Section;
