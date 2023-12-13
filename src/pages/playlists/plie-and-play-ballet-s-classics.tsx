import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection, Playlist} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/ballet.json"
import {tracks, composers} from "../../utils/data/playlists/ballet"

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/ballet-dancer.jpg"
        alt="Ballet dancer"
        loading="eager"
    />,
    <StaticImage
        key="image-2"
        src="../../images/male-ballet-dancer-listening-to-ballet-music.jpg"
        alt="Male listening to ballet music"
    />,
    <StaticImage
        key="image-3"
        src="../../images/ballet-pointe-shoe.jpg"
        alt="Ballet pointe shoe"
    />,
    <StaticImage
        key="image-4"
        src="../../images/couple-listening-to-ballet-music.jpg"
        alt="Couple listening to ballet music"
    />,
]


function Page() {
    data.tracks = tracks()
    data.composers = composers()

    return (
        <Playlist data={data} imageElement={imageElement}/>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
