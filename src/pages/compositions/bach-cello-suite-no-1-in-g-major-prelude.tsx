import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/bach-cello-suite-no-1-in-g-major-prelude.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-with-headphones-reading-cello-suite-no-1-in-g-major-prelude.jpg"
            alt="Smiling Bach with headphones, reading Cello Suite No 1 in G Major Prelude"
            loading="eager"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
