import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/tchaikovsky-piano-concerto-no-1.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-tchaikovsky.jpg"
            alt="Smiling Tchaikovsky"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-tchaikovsky-symphony-no-6.jpg"
            alt="Male playing Tchaikovsky's Piano Concerto No 1"
        /> ,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/female-playing-tchaikovsky-piano-concerto-no-1.jpg"
            alt="Female playing Tchaikovsky's Piano Concerto No 1"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
