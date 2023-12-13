import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../components/Layout";
import {MixSection, Playlist} from "../components/Playlist";
import {ArrayOfDictionaries} from "../utils/ArrayOfDictionaries"
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
        src="../images/two-females-listening-to-classical-music.jpg"
        alt="Two females listening to classical music"
    />,
    <StaticImage
        key="image-3"
        src="../images/female-playing-classical-music-on-piano.jpg"
        alt="Female playing classical music om piano.jpg"
    />,
    <StaticImage
        key="image-4"
        src="../images/male-listening-to-classical-music.jpg"
        alt="Male listening to classical music'"
    />,
]


function Page() {
    data.tracks = homePage()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6,c7], ["annotations"]).getAsSingleDictionary("composer")

    return (
        <Playlist data={data} imageElement={imageElement}/>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
