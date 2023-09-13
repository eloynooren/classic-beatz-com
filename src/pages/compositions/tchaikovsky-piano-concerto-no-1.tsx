import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/male-playing-tchaikovsky-piano-concerto-no-1.jpg"
        alt="Male playing Tchaikovsky's Piano Concerto No 1"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={
        ["Talkin' Shop On","Tchaikovsky's Piano Concerto No 1"]}/>
}

export default Page
