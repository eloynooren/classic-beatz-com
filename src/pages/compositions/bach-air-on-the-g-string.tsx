import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-air-on-the-g-string.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-reading-air-on-the-g-string.jpg"
            alt="Smiling Bach reading Air on the G string"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/male-playing-bach-air-on-the-g-string-on-violin.jpg"
            alt="Male playing Bach's Air on the G string"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/couple-listening-to-bach-air-on-the-g-string.jpg"
            alt="Couple listening to Bach's Air on the G string"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
