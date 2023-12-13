import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection, Playlist} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/piano-solos.json"
import tracks from "../../utils/data/playlists/piano-solos"
import c1 from "../../data/composers/chopin.json";
import c2 from "../../data/composers/satie.json";
import c3 from "../../data/composers/beethoven.json";
import c4 from "../../data/composers/bach.json";
import c5 from "../../data/composers/debussy.json";
import c6 from "../../data/composers/liszt.json";
import c7 from "../../data/composers/mozart.json";

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/pianoforte.jpg"
        alt="Pianoforte"
        loading="eager"
    />,
    <StaticImage
        key="image-4"
        src="../../images/female-listening-to-piano-solos.jpg"
        alt="Female listening to piano solos'"
    />,
    <StaticImage
        key="image-3"
        src="../../images/male-playing-classical-music-on-piano.jpg"
        alt="Male playing classical music on a piano'"
    />,
    <StaticImage
        key="image-2"
        src="../../images/two-males-listening-to-piano-solos.jpg"
        alt="Two males listening to piano solos"
    />,
]


function Page() {
    data.tracks = tracks()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6,c7], ["annotations"]).getAsSingleDictionary("composer")

    return (
        <Playlist data={data} imageElement={imageElement}/>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
