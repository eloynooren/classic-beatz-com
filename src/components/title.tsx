import React from "react"
import * as styles from './title.module.css'


interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({title}) => {
    return (
        <h1 className={styles.title}>
            {title}
        </h1>
    )
}

export default Title
