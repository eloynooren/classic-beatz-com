import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/tchaikovsky-with-laptop.jpg"
        alt="Tchaikovsky with laptop"
        loading="eager"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Tchaikovsky's tale"]}/>
}

export default Page
