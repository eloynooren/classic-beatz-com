import React from 'react';
import {Track} from './track'


interface DisplayTrackProps {
    template: string;
    currentTrack: Track;
}

const DisplayTrack: React.FC<DisplayTrackProps> = ({ template, currentTrack }) => {
    const titleIndex = template.indexOf('TITLE');

    if (titleIndex === -1) {
        return <div align='center'>{template}</div>;
    }

    if (currentTrack.url) {
        return (
            <div align='center'>
                {template.substring(0, titleIndex)}
                <a href={currentTrack.url}>
                    {currentTrack.title}
                </a>
                {template.substring(titleIndex + 'TITLE'.length)}
            </div>
        );
    }

    return <div className={styles.tail}align='center'>{template.replace('TITLE', currentTrack.title)}</div>;
};

export default DisplayTrack;
