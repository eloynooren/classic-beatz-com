import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/male-and-female-playing-singing-handel-hallelujah.jpg"
        alt="Male and female singing Händel's Hallelujah"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Singing Your Heart Out with","Händel's" +
    " Hallelujah"]}/>
}

export default Page
