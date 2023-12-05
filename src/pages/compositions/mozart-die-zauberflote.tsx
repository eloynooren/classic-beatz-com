import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-die-zauberflote.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mozart-thinking-of-die-zauberflote.jpg"
            alt="Mozart thinking of Die Zauberfl\u00f6te"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/0.jpg"
            alt="Orchestra playing Mozart's Die Zauberfl\u00f6te"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-mozart-die-zauberflote.jpg"
            alt="Mozart's Die Zauberfl\u00f6te"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
