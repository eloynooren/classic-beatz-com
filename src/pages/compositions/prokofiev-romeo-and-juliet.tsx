import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/prokofiev-romeo-and-juliet.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/prokofiev-listening-to-romeo-and-julia.jpg"
            alt="Prokofiev listening to Romeo & Juliet"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/romeo-and-julia-dancing.jpg"
            alt="Romeo and Julia dancing on Prokofiev's Romeo & Juliet"
        />,
    'plot':
        <StaticImage
            key="image-composition"
            src="../../images/romeo-and-julia-in-verona.jpg"
            alt="Romeo and Julia dancing on Prokofiev's Romeo & Juliet"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/dad-and-daughter-listening-to-prokofiev-romeo-and-julia.jpg"
            alt="Dad and daughter listening to Prokofiev's Romeo & Juliet"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
