import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/tchaikovsky-symphony-no-6.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/tchaikovsky-listening-to-symphony-no-6.jpg"
            alt="Tchaikovsky listening to Symphony No 6"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-tchaikovsky-symphony-no-6.jpg"
            alt="Orchestra playing Tchaikovsky's Symphony No 6"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-males-listening-to-tchaikovsky-symphony-no-6.jpg"
            alt="Two males listening to Tchaikovsky's Symphony No 6"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
