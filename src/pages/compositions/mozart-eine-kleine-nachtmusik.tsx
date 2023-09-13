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
    />,
    <StaticImage
        key="image-7"
        src="../../images/violin.jpg"
        alt="Violin"
        width="100"
    />,

]

function Page() {
    return <CompositionPage data={data} imageElements={imageElements}/>
}

export default Page
