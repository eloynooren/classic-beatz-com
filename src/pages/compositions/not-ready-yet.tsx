import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/female-playing-bach-toccata-and-fungue-in-d-minor-on-organ.jpg"
        alt="Female playing Vivaldi's spring on violin"
        loading="eager"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Tea Time With Bach's","Toccata and Fugue in" +
    " D minor"]}/>
}

export default Page
