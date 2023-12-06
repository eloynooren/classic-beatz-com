import React from "react";
import {OneButtonAudioPlayer} from "./Audio";
import {Link} from './Layout'
import {IoArrowForward} from 'react-icons/io5';
import {Track} from '../types/track'
import * as styles from './TrackList.module.css'

interface TrackListProps {
    tracks: Track[]
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    const allSameComposer = tracks.every(
        (track, _, array) => track.composer === array[0].composer
    );
    return (
        <div className={styles.list}>
            <div>
                {tracks.map((track, index) => (
                    <div key={index} className={styles.row}>
                        <OneButtonAudioPlayer src={track.src}/>

                        <Link url={track.canonical} arrow={true}>
                            {allSameComposer ? track.composition : (
                                'title' in track ? track.title :
                                    track.composer + "'s" + " + track.composition"
                            )}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TrackList;
