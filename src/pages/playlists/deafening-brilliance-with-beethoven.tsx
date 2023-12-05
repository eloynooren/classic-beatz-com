import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection} from "../../components/Playlist";
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
        src="../../images/beethoven-conducting-a-symphony.jpg"
        alt="Beethoven conducting a symphony"
    />
]


function Page() {
    data.tracks = tracks()

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} pageLabel="Home" seo={data.seo}>
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>