import React from "react";
import {OneButtonAudioPlayer} from "./Audio";
import {Link} from './Layout'
import {Track} from '../types/track'
import * as styles from './TrackList.module.css'

interface TrackListProps {
    tracks: Track[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return (
        <div className={styles.list}>
            <div>
                {tracks.map((track, index) => (
                    <div key={index} className={styles.row}>
                        <OneButtonAudioPlayer src={track.src}/>
                        <Link url={track.url}>{track.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrackList;
