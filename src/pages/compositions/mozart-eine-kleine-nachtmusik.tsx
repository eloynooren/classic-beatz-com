import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-eine-kleine-nachtmusik.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = [
    <StaticImage
        key="image-1"
        src="../../images/smiling-mozart-with-headphones.jpg"
        alt="Mozart with headphones"
    />,
    <StaticImage
        key="image-2"
        src="../../images/2-females-playing-classical-music-on-cello.jpg"
        alt="Two females playing classical music on cello."
    />,
    <StaticImage
        key="image-3"
        src="../../images/female-playing-classical-music-on-violin.jpg"
        alt="Female playing classical music on violin."
    />,
    <StaticImage
        key="image-4"
        src="../../images/male-playing-classical-music-on-cello.jpg"
        alt="Male playing classical music on cello."
    />,
    <StaticImage
        key="image-5"
        src="../../images/male-and-female-playing-classical-music-on-violin.jpg"
        alt="Male and female playing classical music on violins"
    />,
    <StaticImage
        key="image-6"
        src="../../images/male-playing-classical-music-on-violin.jpg"
        alt="Male playing classical music on violin."
    />

]

function Page() {
    let quizMakerObj = new QuizMaker()
    quizMakerObj.addAliasQuestions('Eine kleine Nachtmusik', 4,
        ['K.525', 'A Little Night Music', 'Serenade No. 13 for strings in G major'],
        ['K.225', 'K.252', 'K.255', 'K.522', 'K.552', 'Serenade No. 13 for strings in C major',
            'Serenade No. 31 for strings in G major', 'Serenade No. 31 for strings in C major',
            'Serenade No. 13 for strings in C minor', 'Serenade No. 13 for strings in G minor'])

    return <CompositionPage data={data} imageElements={imageElements} quizMakerObj={quizMakerObj}/>
}

export default Page
