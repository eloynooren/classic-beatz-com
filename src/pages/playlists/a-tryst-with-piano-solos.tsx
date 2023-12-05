import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection} from "../../components/Playlist";
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
    />,
    <StaticImage
        key="image-2"
        src="../../images/female-playing-classical-music-on-piano.jpg"
        alt="Female playing classical music on a piano'"
    />,
    <StaticImage
        key="image-3"
        src="../../images/male-playing-classical-music-on-piano.jpg"
        alt="Male playing classical music on a piano'"
    />,
    <StaticImage
        key="image-4"
        src="../../images/3-female-rappers-playing-classical-music-on-violin.jpg"
        alt="Female rapper playing a cello'"
    />,
]


function Page() {
    data.tracks = tracks()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6,c7], ["annotations"]).getAsSingleDictionary("composer")

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} pageLabel="Home" seo={data.seo}>
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
