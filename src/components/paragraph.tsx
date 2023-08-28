import React from "react"
import * as styles from './paragraph.module.css'


interface ParagraphProps {
    lines: string[]
    variant?: string
}

const Paragraph: React.FC<ParagraphProps> = ({lines, variant}) => {
    let className = ''

    if (variant) {
        if (variant == 'bold') {
            className = styles.bold
        }
    }

    return (
        <div className={className}>
            {lines.join(' ')}
       </div>
    )
}

export default Paragraph
