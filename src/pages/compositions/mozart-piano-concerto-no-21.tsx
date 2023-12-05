import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-piano-concerto-no-21.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mozart-listening-to-piano-concerto-no-21.jpg"
            alt="Mozart listening to Piano Concerto No 21"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/male-playing-mozart-piano-concerto-no-21.jpg"
            alt="Male playing Mozart's Piano Concerto No 21"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/female-listening-to-mozart-piano-concerto-no-21.jpg"
            alt="Female listening to Mozart's Piano Concerto No 21"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
