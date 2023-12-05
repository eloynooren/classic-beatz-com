import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { graphql, useStaticQuery } from 'gatsby';
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/beethoven-fur-elise.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-best-moments"
            src="../../images/beethoven-dancing-on-fur-elise.jpg"
            alt="Beethoven dancing on F\u00fcr Elise"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-composition"
            src="../../images/female-playing-beethoven-fur-elise-on-piano.jpg"
            alt="Female playing Beethoven's F\u00fcr Elise on piano"
        />,
    'listen-guide':
        <StaticImage
            key="image-listen-guide"
            src="../../images/two-females-listening-to-beethoven-fur-elise.jpg"
            alt="Two females listening to Beethoven's F\u00fcr Elise on piano"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
