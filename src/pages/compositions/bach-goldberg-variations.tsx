import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-goldberg-variations.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-enjoying-goldberg-variations.jpg"
            alt="Smiling Bach enjoying Goldberg Variations"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/male-playing-bach-goldberg-variations-on-piano.jpg"
            alt="Male playing Bach's Goldberg Variations on piano"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-males-listening-to-bach-goldberg-variations.jpg"
            alt="Two males listening to Bach's Goldberg Variations"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
