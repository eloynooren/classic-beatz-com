import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-prelude-no-1-in-c-major.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-with-headphones.jpg"
            alt="Smiling Bach with headphones"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/hipster-playing-bach-prelude-no-1-in-c-major-on-piano.jpg"
            alt="Hipster playing Bach's Prelude No 1 In C Major on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/female-listening-to-bach-prelude-no-1-in-c-major.jpg"
            alt="Female listening to Bach's Prelude No 1 In C Major."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
