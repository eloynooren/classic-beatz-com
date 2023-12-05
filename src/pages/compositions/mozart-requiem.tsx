import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-requiem.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mozart-listening-to-requiem.jpg"
            alt="Mozart listening to Requiem"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/0.jpg"
            alt="Orchestra playing Mozart's Requiem"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-mozart-requiem.jpg"
            alt="Male listening to Mozart's Requiem"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
