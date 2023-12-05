import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/brahms-symphony-no-1.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/brahms-listening-to-symphony-no-1.jpg"
            alt="Brahms listening to Symphony No 1"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-brahms-symphony-no-1.jpg"
            alt="Orchestra playing Brahms's Symphony No 1"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-brahms-symphony-no-1.jpg"
            alt="Male listening to Brahms's Symphony No 1"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
