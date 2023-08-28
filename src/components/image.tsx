import React from "react"
import * as styles from './image.module.css'


interface ImageProps {
    image: string;
}

const Image: React.FC<ImageProps> = ({image}) => {
    return (
        <div>
            <img src={image} className='image'/>
       </div>
    )
}

export default Image
