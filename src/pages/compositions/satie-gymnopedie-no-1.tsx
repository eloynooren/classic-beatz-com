import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/satie-gymnopedie-no-1.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-satie.jpg"
            alt="Smiling Satie"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/male-playing-satie-gymnopedie-no-1-on-piano.jpg"
            alt="Male playing Satie's Gymnopedie No 1 on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-satie-gymnopedie-no-1.jpg"
            alt="Male listening to Satie's Gymnopedie No 1."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
