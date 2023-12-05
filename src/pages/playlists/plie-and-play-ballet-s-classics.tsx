import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/ballet.json"
import {tracks, composers} from "../../utils/data/playlists/ballet"

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/ballet-dancer.jpg"
        alt="Ballet dancer"
    />,
    <StaticImage
        key="image-2"
        src="../../images/ballet-pointe-shoe.jpg"
        alt="Ballet pointe shoe"
    />
]


function Page() {
    data.tracks = tracks()
    data.composers = composers()

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} pageLabel="Home" seo={data.seo}>
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>