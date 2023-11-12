import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/mozart-with-mobile-phone.jpg"
        alt="Mozart with mobile phone"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["Mozart's Universe"]}/>
}

export default Page
