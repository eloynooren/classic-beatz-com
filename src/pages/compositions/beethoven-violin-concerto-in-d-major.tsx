import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/beethoven-violin-concerto-in-d-major.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/beethoven-listening-to-violin-concerto-in-d-major.jpg"
            alt="Beethoven listening to Violin Concerto in D Major"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-violin-concerto-in-d-major.jpg"
            alt="Orchestra playing Violin Concerto in D Major"
        />,
    'listen-guide':

        <StaticImage
            key="image-3"
            src="../../images/female-listening-to-violin-concerto-in-d-major.jpg"
            alt="Females listening to Violin Concerto in D Major"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
