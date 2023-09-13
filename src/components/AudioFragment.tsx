import React from "react";
import {OneButtonAudioPlayer} from "./Audio";
import {Paragraph} from './Layout'
import * as styles from './AudioFragment.module.css'

interface AudioFragmentProps {
    heading: string;
    text: string[];
    src: string;
}


export const AudioFragment: React.FC<AudioFragmentProps> = ({heading, text, src}) => {
    return (
        <div className={styles.container}>
            <OneButtonAudioPlayer src={src}/>
            <div className={styles.text}>
                <Paragraph sentences={[heading]} classNames="paragraphLeftAlign paragraphBold" />
                <Paragraph sentences={text} classNames="paragraphLeftAlign" />
            </div>
        </div>
    )
}

export default AudioFragment;
