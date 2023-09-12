import React, {ReactElement} from "react";
import {Paragraph} from './Layout'
import {AudioFragment} from './AudioFragment'
import * as styles from './Section.module.css'

interface SectionProps {
    paragraphs: string[][];
    type?: string;
    audio?: Record<number, string>;
    images: Record<string, ReactElement>
}


export const Section: React.FC<SectionProps> = ({ paragraphs, type, audio , images}) => {
    let numImages = 0

    const renderLines = () => {
        console.log(images)
        const elements = [];

        elements.push(images['before'])

        for (let i = 0; i < paragraphs.length; i++) {
            const lines = paragraphs[i];
            if (type === 'fragments' && lines.length && /^#+\s?\d+/.test(lines[0]) && audio) {
                // Strip leading hashes and spaces
                const heading = lines.join(" ").replace(/^#*\s*\d\.*\s*/, '')
                const number = parseInt(heading.match(/\d+/)[0], 10); // Extract the number
                elements.push(
                    <AudioFragment
                        key={`audio-fragment-${i}`}
                        heading={[heading]}
                        text={paragraphs[i + 1]}
                        src={"fragment-" + audio[number]}
                    />
                );
                i++; // Skip the next sentence in iteration as it's used in AudioFragment
            } else {
                if (lines && !lines[0].startsWith('//')) {
                    elements.push(
                        <Paragraph key={`paragraph-${i}`} lines={lines} classNames="paragraphLeftAlign"/>
                    );
                }
            }
            elements.push(images[i.toString()])
        }
        elements.push(images['after'])
        return elements;
    };

    return <div className={styles.section}>{renderLines()}</div>;
};

export default Section;
