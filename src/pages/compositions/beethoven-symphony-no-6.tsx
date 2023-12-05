import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/beethoven-symphony-no-6.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/beethoven-in-country-side.jpg"
            alt="Beethoven in country side"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-beethoven-symphony-no-6.jpg"
            alt="Orchestra playing Beethoven's Symphony No 6"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/shepherd-listening-to-beethoven-symphony-no-6.jpg"
            alt="Shepherd listening to Beethoven's Symphony No 6"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
