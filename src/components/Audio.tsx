import React, { useState, useEffect, useRef } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { IoPlaySkipBackCircle, IoPlaySkipForwardCircle, IoPlayCircle, IoStopCircle,  IoWarningOutline } from 'react-icons/io5';
import {Track} from '../types/Track';
import {Link, Tooltip} from "./Layout";
import pickRandom from '../utils/pickRandom';
import * as styles from "./Audio.module.css";
import { useDispatch } from './Dispatcher';
import makeTrackTitle from "../utils/makeTrackTitle";

interface OneButtonAudioPlayerProps {
    src: string;
}

export const OneButtonAudioPlayer: React.FC<OneButtonAudioPlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);
    const { active, activate } = useDispatch();

    useEffect(() => {
        if (active !== src) {
            stop();
        }
    }, [active]);

    const play = () => {
        if (audioRef.current) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    if (error.name === 'AbortError') {
                        setIsPlaying(false)
                    } else if (error.name === 'NotSupportedError') {
                        setError('Audio fragment niet beschikbaar');
                    } else {
                        setError(error.message);
                    }
                });
            }
            setIsPlaying(true);
            activate(src)
        }
    }

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }
        setIsPlaying(false);
    }

    useEffect(() => {
        return () => {
            stop();
        };
    }, []);

    if (!src) {
        return null;
    }

    return (
        <div className={styles.oneButtonAudioPlayer}>
            <audio
                ref={audioRef}
                src={src}
                preload='none'
                onEnded={stop}
            />
            {error ? (
                <Tooltip text={error}>
                    <IoWarningOutline className={styles.audioButton} />
                </Tooltip>
            ) : (
                <div onClick={isPlaying ? stop : play}>
                    {isPlaying ? <IoStopCircle  className={styles.audioButton} /> : <IoPlayCircle  className={styles.audioButton}/>}
                </div>
            )}
        </div>
    )
}


interface AudioPlayerProps {
    tracks: Track[];
}

function composeAnnotation(track: Track|undefined) {
    if (track && track.annotations) {
        return '-- ' + pickRandom(Object.keys(track.annotations)) + ' --'
    }
    return '&nbsp'
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({tracks}) => {
    // states
    const [trackIndex, setTrackIndex] = useState(0);
    const [annotation, setAnnotation] = useState(undefined)
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const { active, activate } = useDispatch();
    let interval

    useEffect(() => {
        if (active !== 'AudioPlayer') {
            setIsPlaying(false);
        }
    }, [active]);

    const handlePlay = () => {
        setIsPlaying(true);
        activate('AudioPlayer')
    }

    const handleStop = () => {
        setTrackIndex(0);
        setIsPlaying(false);
    };

    const handleNext = () => {
        setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const handlePrevious = () => {
        setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    };

    useEffect(() => {
        const track = isPlaying ? tracks[trackIndex] : undefined;
        // Clear existing interval if any
        clearInterval(interval);

        // Call foo when trackIndex or isPlaying changes
        setAnnotation(composeAnnotation(track))

        // If isPlaying is true, call foo every 2 seconds
        if (isPlaying) {
            interval = setInterval(() => {
                const track = isPlaying ? tracks[trackIndex] : undefined;
                setAnnotation(composeAnnotation(track))
            }, 2000);
        }

        // Cleanup: Clear the interval when the component unmounts or when isPlaying becomes false
        return () => {
            clearInterval(interval);
        };
    }, [trackIndex, isPlaying]); // useEffect dependencies

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch((msg) => {
                        if ('name' in msg && msg.name == 'NotSupportedError') {
                            if (trackIndex + 1 == tracks.length) {
                                setIsPlaying(false)
                            } else {
                                handleNext()
                            }
                        } else {
                            if (!('name' in msg && msg.name == 'AbortError')) {
                                console.error(msg);
                            }
                        }
                    });
                }
            } else {
                audioRef.current.currentTime = 0;
                audioRef.current.pause();
            }
        }

        return () => {
            audioRef.current?.pause();
        };
    }, [isPlaying, trackIndex]);

    return (
        <div className={styles.audioPlayer}>
            <audio
                src={tracks[trackIndex].src}
                ref={audioRef}
                preload='none'
                onEnded={handleNext}
            />
            {isPlaying ? (
                <div>
                    <div className={styles.annotation}>
                        {annotation}
                    </div>
                    <span onClick={handlePrevious} >
                        <IoPlaySkipBackCircle className={styles.audioButton}/>
                    </span>
                    <span onClick={handleStop}>
                         <IoStopCircle className={styles.audioButton}/>
                    </span>
                    <span onClick={handleNext}>
                        <IoPlaySkipForwardCircle className={styles.audioButton}/>
                    </span>
                    <div align='center'>
                        <Link url={tracks[trackIndex].url}>{makeTrackTitle(tracks[trackIndex])}</Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className={styles.annotation}>&nbsp;</div>
                    <IoPlayCircle onClick={handlePlay} className={styles.audioButton}/>
                    <div>&nbsp;</div>
                </div>
            )
            }
        </div>
    );
};


