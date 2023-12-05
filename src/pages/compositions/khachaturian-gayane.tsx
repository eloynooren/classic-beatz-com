import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/khachaturian-gayane.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/khachaturian-listening-to-gayane.jpg"
            alt="Khachaturian listening to Gayane"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/two-females-dancing-on-khachaturian-gayane.jpg"
            alt="Female dancing on Khachaturian's Gayane"
        />,
    'plot':
        <StaticImage
            key="image-composition"
            src="../../images/harvest-at-farm.jpg"
            alt="Harvest at farm"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/male-listening-to-khachaturian-gayane.jpg"
            alt="Male listening to Khachaturian's Gayane"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
