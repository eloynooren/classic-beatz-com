import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/vivaldi-spring-four-seasons.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'fragments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-vivaldi.jpg"
            alt="Smiling Vivaldi"
        />,
    'composition':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-vivaldi-spring-on-violin.jpg"
            alt="Female playing Vivaldi's spring on violin"
        />,
    'tracks':
        <StaticImage
            key="image-3"
            src="../../images/two-males-with-a-cello.jpg"
            alt="Two males with a celllo"
        />,
    'exam':
        <StaticImage
            key="image-4"
            src="../../images/female-taking-a-quiz-on-mobile-phone.jpg"
            alt="Female taking a quiz on mobile phone."
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
