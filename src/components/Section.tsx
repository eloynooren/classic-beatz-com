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

    const Image = (image: ReactElement) => {
        return <div className={styles.imageContainer}>{image}</div>
    }

    const renderLines = () => {
        const elements = [];

        elements.push(Image(images['before']))

        for (let i = 0; i < paragraphs.length; i++) {
            const sentences = paragraphs[i];
            if (type === 'fragments' && sentences.length && /^#+\s?\d+/.test(sentences[0]) && audio) {
                // Strip leading hashes and spaces
                const heading = sentences.join(" ").replace(/^#*\s*\d\.*\s*/, '')
                const number = parseInt(heading.match(/\d+/)[0], 10); // Extract the number
                elements.push(
                    <AudioFragment
                        key={`audio-fragment-${i}`}
                        heading={heading}
                        text={paragraphs[i + 1]}
                        src={"fragment-" + audio[number]}
                    />
                );
                i++; // Skip the next sentence in iteration as it's used in AudioFragment
            } else {
                if (sentences && !sentences[0].startsWith('//')) {
                    elements.push(
                        <Paragraph key={`paragraph-${i}`} sentences={sentences} classNames="paragraphLeftAlign"/>
                    );
                }
            }
            elements.push(Image(images[(i+1).toString()]))
        }
        elements.push(Image(images['after']))
        return elements;
    };

    return <div className={styles.section}>{renderLines()}</div>;
};

export default Section;
