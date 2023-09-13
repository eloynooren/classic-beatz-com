import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/female-playing-classical-music-on-piano-1.jpg"
        alt="Female playing classical music on piano"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["On the Flip with","Beethoven's Für Elise"]}/>
}

export default Page
