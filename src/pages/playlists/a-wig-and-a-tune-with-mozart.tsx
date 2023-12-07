import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/mozart.json"
import tracks from "../../utils/data/playlists/mozart";

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/mozart-in-vienna.jpg"
        alt="Mozart in Vienna"
        loading="eager"
    />,
    <StaticImage
        key="image-1"
        src="../../images/male-listening-to-mozart.jpg"
        alt="Male listening to Mozart"
    />,
    <StaticImage
        key="image-2"
        src="../../images/mozart-dancing.jpg"
        alt="Mozart dancing"
    />,
    <StaticImage
        key="image-1"
        src="../../images/two-females-listening-to-mozart.jpg"
        alt="Two females listening to Mozart"
    />,
]


function Page() {
    data.tracks = tracks()

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} seo={data.seo}>
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
