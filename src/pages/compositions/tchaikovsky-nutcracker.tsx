import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/tchaikovsky-nutcracker.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/tchaikovsky-listening-to-nutcracker.jpg"
            alt="Tchaikovsky ... Nutcracker"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/couple-dancing-on-tchaikovsky-nutcracker.jpg"
            alt="Couple dancing on Tchaikovsky's Nutcracker"
        />,
    'plot':
        <StaticImage
            key="image-composition"
            src="../../images/nutcracker-toy.jpg"
            alt="Nutcracker toy"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/couple-listening-to-tchaikovsky-nutcracker.jpg"
            alt="Two females listening to Tchaikovsky's Nutcracker"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
