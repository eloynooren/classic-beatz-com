import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/bach-with-mobile-phone.jpg"
        alt="Bach with mobile phone"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Bach's world"]}/>
}

export default Page
