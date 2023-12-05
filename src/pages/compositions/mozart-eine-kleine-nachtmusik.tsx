import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-eine-kleine-nachtmusik.json";
import {QuizMaker} from "../../utils/QuizMaker";

const imageElements = {
    'best-moments':
        <StaticImage
            key="image-1"
            src="../../images/smiling-mozart-with-headphones.jpg"
            alt="Mozart with headphones"
            loading="eager"
        />,
    'backstory':
        <StaticImage
            key="image-2"
            src="../../images/female-playing-mozart-eine-kleine-nachtmusik-on-violin.jpg"
            alt="Female playing Mozart's Eine Kleine Nachtmusik on violin."
        />,
    'listen-guide':
        <StaticImage
            key="image-3"
            src="../../images/two-smiling-males-listening-to-mozart-eine-kleine-nachtmusik-on-headphones.jpg"
            alt="Two smiling males listening to Mozart's Eine Kleine Nachtmusik on headphones.jpg."
        />,
}

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
