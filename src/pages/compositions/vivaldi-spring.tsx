import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/male-playing-vivaldi-spring-on-violin.jpg"
        alt="Male playing Vivaldi's spring on violin"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["A Fling with","Vivaldi's Spring"]}/>
}

export default Page
