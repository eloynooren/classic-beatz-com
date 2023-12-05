import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-jesu-joy-of-man-s-desiring.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-composing-jesu-joy-of-man-s-desiring.jpg"
            alt="Smiling Bach composing Jesu, Joy of Man's Desiring"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-bach-jesu-joy-of-man-s-desiring-on-viola.jpg"
            alt="Female playing Bach's Jesu, Joy of Man's Desiring on viola"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/couple-listening-to-bach-jesu-joy-of-man-s-desiring.jpg"
            alt="Couple listening to Bach's Jesu, Joy of Man's Desiring"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
