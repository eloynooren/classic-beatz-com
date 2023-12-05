import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/ravel-bolero.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/ravel-listening-to-bolero.jpg"
            alt="Ravel listening to Bolero"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/couple-dancing-on-ravel-bolero.jpg"
            alt="Female dancing on Ravel's Bolero"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/boys-listening-to-ravel-bolero.jpg"
            alt="Boys listening to Ravel's Bolero"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
