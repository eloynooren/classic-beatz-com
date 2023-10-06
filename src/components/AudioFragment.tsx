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
            <Paragraph sentences={[heading]}/>
            <OneButtonAudioPlayer src={src}/>
            <Paragraph sentences={text} classNames={'paragraphJustify'}/>
        </div>
    )
}

export default AudioFragment;
