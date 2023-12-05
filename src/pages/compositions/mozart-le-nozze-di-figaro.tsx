import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-le-nozze-di-figaro.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mozart-thinking-of-le-nozze-di-figaro.jpg"
            alt="Mozart thinking of Le Nozze di Figaro"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/0.jpg"
            alt="Orchestra playing Mozart's Le Nozze di Figaro"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-females-listening-to-mozart-le-nozze-di-figaro.jpg"
            alt="Two females listening to Mozart's Le Nozze di Figaro"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
