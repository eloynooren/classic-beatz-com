import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/chopin-with-mobile-phone.jpg"
        alt="Chopin with mobile phone"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Chopin's Chronicles"]}/>
}

export default Page
