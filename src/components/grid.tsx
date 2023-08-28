import React from "react"
import * as styles from './grid.module.css'


interface GridProps {
    children: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({children}) => {
    return (
        <div className={styles.grid_2_cols}>
            {children}
        </div>
    )
}

export default Grid
