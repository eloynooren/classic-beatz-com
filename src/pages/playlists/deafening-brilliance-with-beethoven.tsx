import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection, Playlist} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/beethoven.json"
import tracks from "../../utils/data/playlists/beethoven"

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/beethoven-in-vienna.jpg"
        alt="Beethoven in Vienna"
    />,
    <StaticImage
        key="image-2"
        src="../../images/chinese-male-listening-to-beethoven.jpg"
        alt="Chinese male listening to Beethoven"
    />,
    <StaticImage
        key="image-3"
        src="../../images/beethoven-conducting-a-symphony.jpg"
        alt="Beethoven conducting a symphony"
    />,
    <StaticImage
        key="image-4"
        src="../../images/two-females-listening-to-beethoven.jpg"
        alt="Two females listening to Beethoven"
    />,
]


function Page() {
    data.tracks = tracks()

    return (
        <Playlist data={data} imageElement={imageElement}/>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
