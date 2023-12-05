import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-brandenburg-concerto-no-2.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/bach-enjoying-brandenburg-concerto-no-2.jpg"
            alt="Smiling Bach enjoying Brandenburg Concerto No 2"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-bach-brandenburg-concerto-no-2-on-trumpet.jpg"
            alt="Female playing Bach's Brandenburg Concerto No 2 on trumpet"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-bach-brandenburg-concerto-no-2.jpg"
            alt="Male listening to Bach's Brandenburg Concerto No 2"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
