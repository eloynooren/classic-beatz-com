import React from 'react';
import NotReadyYetPage from "../../components/NotReadyYetPage";
import { StaticImage } from "gatsby-plugin-image";


const imageElement = (
    <StaticImage
        key="image-1"
        src="../../images/females-singing-verdi-aida.jpg"
        alt="Females singing Verdi's Aida"
    />
)

function Page() {
    return <NotReadyYetPage imageElement={imageElement} headerTitle={["A Sit-Down With ","Verdi's Aida"]}/>
}

export default Page
