import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/ponchielli-danza-delle-ore.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/ponchielli-listening-to-danza-delle-ore.jpg"
            alt="Ponchielli listening to Danza delle Ore"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/female-dancing-on-ponchielli-danza-delle-ore.jpg"
            alt="Female dancing on Ponchielli's Danza delle Ore"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/couple-listening-to-ponchielli-danza-delle-ore.jpg"
            alt="Couple listening to Ponchielli's Danza delle Ore"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
