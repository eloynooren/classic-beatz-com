import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/handel-hallelujah.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-and-singing-handel.jpg"
            alt="Smiling and singing Händel"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/male-and-female-playing-singing-handel-hallelujah.jpg"
            alt="Male and female singing Händel's Hallelujah"
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/choir-singing-hallelujah.jpg"
            alt="Choir singing Händel's Hallelujah"
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
