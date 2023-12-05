import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";
import {QuizMaker} from "../../utils/QuizMaker";
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/verdi-aida.json";


const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-verdi.jpg"
            alt="Smiling Verdi"
            loading="eager"
        />,
    'plot':
        <StaticImage
            key="image-2"
            src="../../images/egyptian-pyramide.jpg"
            alt="Egyptian pyramide"
        />,
    'backstory':
        <StaticImage
            key="image-3"
            src="../../images/female-singing-an-aria-of-verdi-aida.jpg"
            alt="Female singing an aria of Verdi's Aida"
        />,
    'listen-guide':
        <StaticImage
            key="image-4"
            src="../../images/male-singing-an-aria-of-verdi-aida.jpg"
            alt="Male singing an aria of Verdi's Aida"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
