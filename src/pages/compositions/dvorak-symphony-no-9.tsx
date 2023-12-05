import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/dvorak-symphony-no-9.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/dvorak-listening-to-symphony-no-9.jpg"
            alt="Dvořák listening to Symphony No 9"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/orchestra-playing-dvorak-symphony-no-9.jpg"
            alt="Orchestra playing Dvořák's Symphony No 9"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/female-listening-to-dvorak-symphony-no-9.jpg"
            alt="Female listening to Dvořák's Symphony No 9"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
