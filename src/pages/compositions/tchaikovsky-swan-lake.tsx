import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/tchaikovsky-swan-lake.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/tchaikovsky-composing-swan-lake.jpg"
            alt="Tchaikovsky ... Swan Lake"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/female-dancing-on-tchaikovsky-swan-lake.jpg"
            alt="Female dancing on Tchaikovsky's Swan Lake"
        />,
    'plot':
        <StaticImage
            key="image-composition"
            src="../../images/swan.jpg"
            alt="Swan"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/male-listening-to-tchaikovsky-swan-lake.jpg"
            alt="Males listening to Tchaikovsky's Swan Lake"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
