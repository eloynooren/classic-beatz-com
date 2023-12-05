import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-don-giovanni.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mozart-thinking-of-don-giovanni.jpg"
            alt="Mozart thinking of Don Giovanni"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/0.jpg"
            alt="Orchestra playing Mozart's Don Giovanni"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-males-listening-to-mozart-don-giovanni.jpg"
            alt="Two males listening to Mozart's Don Giovanni"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
