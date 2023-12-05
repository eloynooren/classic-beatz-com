import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/beethoven-appassionata.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/beethoven-listening-to-appassionata.jpg"
            alt="Beethoven listening to Appassionata"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/male-playing-beethoven-appassionata.jpg"
            alt="Male playing Beethoven's Appassionata"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/chinese-male-listening-to-beethoven-appassionata.jpg"
            alt="Chinese male listening to Beethoven's Appassionata"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
