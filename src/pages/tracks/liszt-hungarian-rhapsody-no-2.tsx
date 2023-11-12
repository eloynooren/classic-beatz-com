import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/tracks/liszt-hungarian-rhapsody-no-2.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-liszt.jpg"
            alt="Smiling Liszt"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-liszt-hungarian-rhapsody-no-2-on-piano.jpg"
            alt="Female playing Liszt's Hungarian Rhapsody No 2 on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-liszt-hungarian-rhapsody-no-2.jpg"
            alt="Male listening to Liszt's Hungarian Rhapsody No 2."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
