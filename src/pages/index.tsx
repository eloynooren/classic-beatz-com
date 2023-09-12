import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../components/Layout";
import {MixSection} from "../components/MixPage";
import {ArrayOfDictionaries} from "../utils/ArrayOfDictionaries"
import "./index.css";
import data from "../data/index.json"
import t1 from "../data/compositions/mozart-eine-kleine-musik.json"
import t2 from "../data/compositions/beethoven-fur-elise.json"
import t3 from "../data/compositions/vivaldi-spring-four-seasons.json"
import t4 from "../data/compositions/bach-toccata-and-fugue-in-d-minor.json"
import t5 from "../data/compositions/handel-hallelujah.json"
import t6 from "../data/compositions/tchaikovsky-piano-concerto-no-1.json"
import t7 from "../data/compositions/verdi-aida.json"
import c1 from "../data/composers/mozart.json";
import c2 from "../data/composers/beethoven.json";
import c3 from "../data/composers/vivaldi.json";
import c4 from "../data/composers/bach.json";
import c5 from "../data/composers/händel.json";
import c6 from "../data/composers/tchaikovsky.json";
import c7 from "../data/composers/verdi.json";

const imageElement = [
    <StaticImage
        key="image-6"
        src="../images/female-rapper-playing-a-cello.jpg"
        alt="Female rapper playing classical music on a cello'"
    />,
    <StaticImage
        key="image-2"
        src="../images/couple-playing-classical-music-on-piano.jpg"
        alt="Couple playing classical music om piano.jpg"
    />,
    <StaticImage
        key="image-1"
        src="../images/3-female-rappers-playing-classical-music-on-violin.jpg"
        alt="Female rapper playing a cello'"
    />,
]


function Page() {
    console.log(data)
    data.tracks = new ArrayOfDictionaries([t1, t2, t3, t4, t5, t6, t7]).get()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6,c7], ["annotations"]).getAsSingleDictionary("composer")
    console.log(data)

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} pageLabel="Home">
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
