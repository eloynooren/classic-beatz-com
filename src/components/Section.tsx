import React, {ReactElement} from "react";
import {Paragraph} from './Layout'
import {AudioFragment} from './AudioFragment'
import * as styles from './Section.module.css'
import {QuizMaker} from "../utils/QuizMaker";
import Quiz from "./Quiz";
import Pairs from "./Pairs";
import  {Spotify} from 'react-spotify-embed';
import GoogleAd from "./GoogleAd";


interface SectionProps {
    paragraphs: string[][];
    type?: string;
    audio?: Record<number, string>;
    images?: Record<string, ReactElement>
    quizIntro?: string[]
    quizMakerObj?: QuizMaker
    pairsIntro?: string[]
    pairsInstruction?: string
    pairsMakerObj?: {[key: string]: { [key: string]: string; } }
    spotify?: string
}


export const Section: React.FC<SectionProps> = ({ paragraphs, type, audio , images, quizIntro, quizMakerObj, pairsIntro, pairsInstruction, pairsMakerObj, spotify}) => {
    let numImages = 0

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
                       classNames="paragraphCenter paragraphSpaceOutVertically"/>)
        }

        if (quizMakerObj) {
            elements.push(<Quiz key={"quiz"} buttonLabel="Go Quiz!" quizMakerObj={quizMakerObj}/>)
            elements.push(<GoogleAd key={"ad-1"}/>)
        }

        if (pairsIntro) {
            elements.push(
                <Paragraph key={`pairs-intro`} sentences={pairsIntro}
                       classNames="paragraphCenter paragraphSpaceOutVertically"/>)
        }

        if (pairsMakerObj) {
            console.log(pairsInstruction)
            elements.push(<Pairs key={"pairs"} buttonLabel="Pair the Pieces" instruction={pairsInstruction} pairsMakerObj={pairsMakerObj}/>)
            elements.push(<GoogleAd key={"ad-2"}/>)
        }

        if (spotify) {
            elements.push(<Spotify key={"spotify"} className={styles.spotify} link={spotify}/>)
        }
        console.log(elements)

        return elements;
    };

    return <div className={styles.section}>{renderLines()}</div>;
};

export default Section;
