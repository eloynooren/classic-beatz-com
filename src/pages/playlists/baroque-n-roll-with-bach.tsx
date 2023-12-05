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
    />,
    <StaticImage
        key="image-2"
        src="../../images/male-playing-bach-on-organ.jpg"
        alt="Male playing Bach on organ"
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
