import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-symphony-no-40.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/mozart-listening-to-symphony-40.jpg"
            alt="Mozart listening to Symphony No 40"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-mozart-symphony-no-40.jpg"
            alt="Orchestra playing Mozart's Symphony No 40"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-females-listening-to-mozart-symphony-no-40.jpg"
            alt="Two females listening to Mozart's Symphony No 40"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
