import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../components/Layout";
import {MixSection} from "../components/Playlist";
import {ArrayOfDictionaries} from "../utils/ArrayOfDictionaries"
import "./index.css";
import data from "../data/playlists/homepage.json"
import homePage from "../utils/data/playlists/home-page"
import c1 from "../data/composers/mozart.json";
import c2 from "../data/composers/beethoven.json";
import c3 from "../data/composers/vivaldi.json";
import c4 from "../data/composers/bach.json";
import c5 from "../data/composers/händel.json";
import c6 from "../data/composers/tchaikovsky.json";
import c7 from "../data/composers/verdi.json";

const imageElement = [
    <StaticImage
        key="image-1"
        src="../images/female-rapper-playing-a-cello.jpg"
        alt="Female rapper playing classical music on a cello'"
        loading="eager"
    />,
    <StaticImage
        key="image-2"
        src="../images/couple-playing-classical-music-on-piano.jpg"
        alt="Couple playing classical music om piano.jpg"
    />,
    <StaticImage
        key="image-3"
        src="../images/3-female-rappers-playing-classical-music-on-violin.jpg"
        alt="Female rapper playing a cello'"
    />,
]


function Page() {
    data.tracks = homePage()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6,c7], ["annotations"]).getAsSingleDictionary("composer")

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} pageLabel="Home" seo={data.seo}>
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
