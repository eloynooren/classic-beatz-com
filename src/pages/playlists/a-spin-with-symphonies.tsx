import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Layout} from "../../components/Layout";
import {MixSection} from "../../components/Playlist";
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
        src="../../images/conductor-of-symphony-orchestra.jpg"
        alt="Conductor of a symphony orchestra"
        loading="eager"
    />,
    <StaticImage
        key="image-2"
        src="../../images/symphony-orchestra.jpg"
        alt="Symphony orchestra"
    />
]


function Page() {
    data.tracks = tracks()
    data.composers = new ArrayOfDictionaries([c1,c2,c3,c4,c5,c6], ["annotations"]).getAsSingleDictionary("composer")

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title} seo={data.seo}>
           <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
