import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/tracks/mozart-rondo-alla-turca.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-mozart-in-hoodie.jpg"
            alt="Smiling Mozart in hoodie"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-mozart-alla-turca-on-piano.jpg"
            alt="Female playing Mozart's Rondo Alla Turca on piano."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/male-listening-to-mozart-rondo-alla-turca.jpg"
            alt="Male listening to Mozart's Rondo Alla Turca."
        />,
}

function Page() {
    let quizMakerObj = new QuizMaker()

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
