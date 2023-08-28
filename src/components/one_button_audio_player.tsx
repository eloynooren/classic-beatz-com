import React, { useState, useEffect, useRef } from "react"
import { useClickAway } from "@uidotdev/usehooks";
import { IoPlayCircle, IoWarningOutline, IoStopCircle } from 'react-icons/io5';
import Tooltip from './Tooltip';

interface OneButtonAudioPlayerProps {
    src: string;
}

const OneButtonAudioPlayer: React.FC<OneButtonAudioPlayerProps> = ({ src }) => {
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
        <div>
            <audio
                ref={audioRef}
                src={src}
                preload='none'
                onEnded={stop}
            />
            {error ? (
                <Tooltip text={error}>
                    <IoWarningOutline sx={{ variant: 'audioButton' }} />
                </Tooltip>
            ) : (
                <div ref={buttonRef} onClick={isPlaying ? stop : play}>
                {isPlaying ? <IoStopCircle sx={{ variant: 'audioButton' }} /> : <IoPlayCircle sx={{ variant: 'audioButton' }} />}
                </div>
            )}
        </div>
    )
}

export default OneButtonAudioPlayer;
