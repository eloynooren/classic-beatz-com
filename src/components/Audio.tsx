import React, { useState, useEffect, useRef } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { IoPlaySkipBackCircle, IoPlaySkipForwardCircle, IoPlayCircle, IoStopCircle,  IoWarningOutline } from 'react-icons/io5';
import {Track} from '../types/Track';
import {Link, Tooltip} from "./Layout";
import pickRandom from '../utils/pickRandom';
import * as styles from "./Audio.module.css";

interface OneButtonAudioPlayerProps {
    src: string;
}

export const OneButtonAudioPlayer: React.FC<OneButtonAudioPlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState('');
    const audioRef = useRef<HTMLAudioElement>(null);

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
        }
    }

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
        }
        setIsPlaying(false);
    }

    const buttonRef = useClickAway(() => {
        stop();
    });

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
                <div ref={buttonRef} onClick={isPlaying ? stop : play}>
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
    let interval

    const handlePlay = () => {
        setIsPlaying(true);
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

    const controlRef = useClickAway(() => {
        setIsPlaying(false)
    })

    return (
        <div className={styles.audioPlayer} ref={controlRef}>
            <audio
                src={tracks[trackIndex].src}
                ref={audioRef}
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
                        <Link url={tracks[trackIndex].url}>{tracks[trackIndex].title}</Link>
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


