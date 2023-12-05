import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/beethoven-moonlight-sonata.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-beethoven-in-hoodie.jpg"
            alt="Smiling Beethoven in hoodie"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/hipster-female-playing-beethoven-moonlight-sonata-on-piano.jpg"
            alt="Hipster female playing Beethoven's Moonlight Sonata on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-beethoven-moonlight-sonata.jpg"
            alt="Male listening to Beethoven's Moonlight Sonata."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
