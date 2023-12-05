import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/vivaldi-spring-four-seasons.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-vivaldi.jpg"
            alt="Smiling Vivaldi"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-vivaldi-spring-on-violin.jpg"
            alt="Female playing Vivaldi's Spring on violin"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-females-listening-to-vivaldi-spring.jpg"
            alt="Two females listening to Vivaldi's Spring"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
