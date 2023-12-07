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
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
