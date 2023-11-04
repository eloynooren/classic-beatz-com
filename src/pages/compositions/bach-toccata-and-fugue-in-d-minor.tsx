import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/bach-toccata-and-fugue-in-d-minor.json";
import {QuizMaker} from "../../utils/QuizMaker";


const imageElements = {
    'fragments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-bach-playing-on-organ.jpg"
            alt="Smiling Bach playing on organ"
        />,
    'composition':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-bach-toccata-and-fungue-in-d-minor-on-organ.jpg"
            alt="Female playing Vivaldi's spring on violin"
        />,
    'analysis':
        <StaticImage
            key="image-3"
            src="../../images/laughing-rapper-with-organ-in-cathedral.jpg"
            alt="Laughing rapper with organ in cathedral"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
