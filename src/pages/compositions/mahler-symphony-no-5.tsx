import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mahler-symphony-no-5.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mahler-listening-to-symphony-no-5.jpg"
            alt="Mahler listening to  Symphony No 5"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-mahler-symphony-no-5.jpg"
            alt="Orchestra playing Mahler's Symphony No 5"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-mahler-symphony-no-5.jpg"
            alt="Male listening to Mahler's Symphony No 5"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
