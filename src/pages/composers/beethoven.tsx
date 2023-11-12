import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/beethoven-with-laptop.jpg"
        alt="Beethoven with laptop"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Beethove Unleashed"]}/>
}

export default Page
