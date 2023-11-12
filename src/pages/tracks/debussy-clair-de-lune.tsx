import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/tracks/debussy-clair-de-lune.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-debussy.jpg"
            alt="Smiling Debussy"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/hipster-female-playing-debussy-clair-de-lune-on-piano.jpg"
            alt="hipster female playing Debussy's Clair De Lune on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-smiling-males-listening-to-debussy-clair-de-lune-on-headphones.jpg"
            alt="Two males listening to Debussy's Clair De Lune on headphones."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
