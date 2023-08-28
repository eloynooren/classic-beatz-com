import React from "react"
import * as styles from './square.module.css'


interface SquareProps {
    children: React.ReactNode;
}

const Square: React.FC<SquareProps> = ({children}) => {
    return (
        <div>
            {children}
       </div>
    )
}

export default Square
