import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";
import {QuizMaker} from "../../utils/QuizMaker";
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/verdi-aida.json";


const imageElements = {
    'fragments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-verdi.png"
            alt="Females singing Verdi's Aida"
        />,
    'plot':
        <StaticImage
            key="image-2"
            src="../../images/egyptian-pyramide.png"
            alt="Egyptian pyramide"
        />,
    'composition':
        <StaticImage
            key="image-3"
            src="../../images/female-singing-an-aria-of-verdi-aida.jpg"
            alt="Female singing an aria of Verdi's Aida"
        />,
    'tracks':
        <StaticImage
            key="image-4"
            src="../../images/male-singing-an-aria-of-verdi-aida.jpg"
            alt="Male singing an aria of Verdi's Aida"
        />,
    'exam':
        <StaticImage
            key="image-5"
            src="../../images/couple-taking-a-quiz-on-laptop.jpg"
            alt="Couple taking a quiz on a laptop"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
