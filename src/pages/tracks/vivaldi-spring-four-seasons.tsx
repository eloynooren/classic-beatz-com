import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/tracks/vivaldi-spring-four-seasons.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-vivaldi.jpg"
            alt="Smiling Vivaldi"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-vivaldi-spring-on-violin.jpg"
            alt="Female playing Vivaldi's spring on violin"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-males-with-a-cello.jpg"
            alt="Two males with a celllo"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
