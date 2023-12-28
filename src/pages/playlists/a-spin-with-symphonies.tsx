import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection, Playlist} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/symphonies.json"
import tracks from "../../utils/data/playlists/symphonies"
import c1 from "../../data/composers/tchaikovsky.json";
import c2 from "../../data/composers/mahler.json";
import c3 from "../../data/composers/beethoven.json";
import c4 from "../../data/composers/brahms.json";
import c5 from "../../data/composers/dvorak.json";
import c6 from "../../data/composers/mozart.json";

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/orchestra-playing-classical-music.jpg"
        alt="Orchestra playing classical music"
        loading="eager"
    />,
    <StaticImage
        key="image-2"
        src="../../images/female-listening-to-symphony.jpg"
        alt="Female listening to a symphony"
    />,
    <StaticImage
        key="image-3"
        src="../../images/conductor-of-symphony-orchestra.jpg"
        alt="Conductor of a symphony orchestra"
        loading="eager"
    />,
    <StaticImage
        key="image-3"
        src="../../images/couple-listening-to-symphony.jpg"
        alt="Couple listening to a symphony"
        loading="eager"
    />,
]


function Page() {
    data.tracks = tracks()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6], ["annotations"]).getAsSingleDictionary("composer")

    return (
        <Playlist data={data} imageElement={imageElement}/>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
