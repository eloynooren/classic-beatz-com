import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/delibes-sylvia.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/delibes-listening-to-sylvia.jpg"
            alt="Delibes listening to Sylvia"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/tip-toeing-on-delibes-s-sylvia.jpg"
            alt="Tip-Toeing on Delibes's Sylvia"
        />,
    'plot':
        <StaticImage
            key="image-composition"
            src="../../images/female-dancing-on-delibes-s-sylvia.jpg"
            alt="Tip-Toeing on Delibes's Sylvia"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/male-ballet-dancer-listening-to-delibes-sylvia.jpg"
            alt="Male ballet dancer listening to Delibes's Sylvia"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
