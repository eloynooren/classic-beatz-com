import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/tracks/chopin-nocturne-in-e-flat-major.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-chopin.jpg"
            alt="Smiling Chopin"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/hipster-playing-chopin-nocturne-in-e-flat-major-on-piano.jpg"
            alt="Hipster playing Chopin's Nocturne in E Flat Major on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/female-listening-to-chopin-nocturne-in-e-flat-major.jpg"
            alt="female listening to Chopin's Nocturne In E Flat Major."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
