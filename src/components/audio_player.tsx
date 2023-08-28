import React, { useState, useEffect, useRef } from 'react';
import { useClickAway } from "@uidotdev/usehooks";
import { IoPlaySkipBackCircle, IoPlaySkipForwardCircle, IoPlayCircle, IoStopCircle } from 'react-icons/io5';
import DisplayTrack from './display_track';
import * as styling from './audio.module.css'
import {Track} from './track';

interface AudioPlayerProps {
    tracks: Track[];
    template: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({tracks, template}) => {
    // states
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = () => {
        setIsPlaying(true);
    };

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
                                console.log(msg);
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
        <div className={styling.audioPlayer} ref={controlRef}>
            <audio
                src={tracks[trackIndex].src}
                ref={audioRef}
                onEnded={handleNext}
            />
            {isPlaying ? (
                <div>
                    <span onClick={handlePrevious} >
                        <IoPlaySkipBackCircle className={styling.audioButton}/>
                    </span>
                    <span onClick={handleStop}>
                         <IoStopCircle className={styling.audioButton}/>
                    </span>
                    <span onClick={handleNext}>
                        <IoPlaySkipForwardCircle className={styling.audioButton}/>
                    </span>
                    <DisplayTrack
                        template={template
                            .replace('NUMBER', tracks.length.toString())
                            .replace('CURRENT', (trackIndex + 1).toString())}
                        currentTrack={tracks[trackIndex]}
                    />
                </div>
            ) : (
                <div>
                    <IoPlayCircle onClick={handlePlay} className={styling.audioButton}/>
                    <div>&nbsp;</div>
                </div>
            )
            }
        </div>
    );
};
export default AudioPlayer;
