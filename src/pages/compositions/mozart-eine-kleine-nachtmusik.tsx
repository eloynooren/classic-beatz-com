import React from 'react';
import CompositionPage from "../../components/CompositionPage";
import { StaticImage } from "gatsby-plugin-image";
import data from "../../data/compositions/mozart-eine-kleine-musik.json";

const imageElements = [
    <StaticImage
        key="image-1"
        src="../../images/smiling-mozart-with-headphones.jpg"
        alt="Mozart with headphones"
    />,
    <StaticImage
        key="image-2"
        src="../../images/three-rapper-playing-classical-music-on-strings.jpg"
        alt="Three rappers playing classical music on strings"
    />,
    <StaticImage
        key="image-3"
        src="../../images/rappers-partying-on-allegro-of-eine-kleine-nachtmusik.jpg"
        alt="Rapper partying on Allegro of 'Eine kleine Nachtmusik'"
    />,
    <StaticImage
        key="image-4"
        src="../../images/flowerbed-with-rappers-playing-on-violin.jpg"
        alt="Flowerbed with rappers playing on violin"
    />,
    <StaticImage
        key="image-5"
        src="../../images/rapper-playing-a-violin.jpg"
        alt="Rapper playing a-violin"
    />,
    <StaticImage
        key="image-6"
        src="../../images/female-rapper-playing-a-cello.jpg"
        alt="Female rapper playing a cello'"
    />,
]

function Page() {
    return <CompositionPage data={data} imageElements={imageElements}/>
}

export default Page
