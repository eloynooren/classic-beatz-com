import React from "react"
import Paragraph from "./paragraph"

interface ParagraphsProps {
    paragraphs: string[][]
    variant?: string
}

const Paragraphs: React.FC<ParagraphsProps> = ({paragraphs, variant}) => {
    let className = ''
    let innerVariants = Array(paragraphs.length).fill("")

    if (variant) {
        if (variant == 'firstParagraphBold') {
            innerVariants[0] = "bold"
        }
    }

    return (
        <div className={className}>
            {paragraphs.map((paragraph,index) => (
                <Paragraph key={index} lines={paragraph} variant={innerVariants[index]}/>
            ))}
        </div>
    )
}

export default Paragraphs;
