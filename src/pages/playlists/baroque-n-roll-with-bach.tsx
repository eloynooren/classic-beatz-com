import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection} from "../../components/Playlist";
import {ArrayOfDictionaries} from "../../utils/ArrayOfDictionaries"
import data from "../../data/playlists/bach.json"
import tracks from "../../utils/data/playlists/bach"

const imageElement = [
    <StaticImage
        key="image-1"
        src="../../images/bach-dancing.jpg"
        alt="Bach dancing"
        loading="eager"
    />,
    <StaticImage
        key="image-2"
        src="../../images/couple-listening-to-bach.jpg"
        alt="Couple listening to Bach"
    />,
    <StaticImage
        key="image-3"
        src="../../images/male-playing-bach-on-organ.jpg"
        alt="Male playing Bach on organ"
    />,
    <StaticImage
        key="image-4"
        src="../../images/two-males-listening-to-bach.jpg"
        alt="Two males listening to Bach"
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
