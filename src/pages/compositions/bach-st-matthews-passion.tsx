import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-st-matthews-passion.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-composing-st-matthews-passion.jpg"
            alt="Smiling Bach composing St Matthew's Passion"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/choir-singing-bach-st-matthews-passion.jpg"
            alt="Choir singing Bach's St Matthew's Passion"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/couple-listening-to-bach-st-matthews-passion.jpg"
            alt="Couple listening to Bach's St Matthew's Passion"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
