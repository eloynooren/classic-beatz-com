import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";
import CompositionPage from "../../components/CompositionPage";
import data from "../../data/compositions/beethoven-fur-elise.json";
import {QuizMaker} from "../../utils/QuizMaker";


const imageElements = {
    'fragments':
        <StaticImage
            key="image-1"
            src="../../images/female-playing-classical-music-on-piano-1.jpg"
            alt="Female playing classical music on piano"
        />
}

function Page() {
    let quizMakerObj = new QuizMaker()
    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
