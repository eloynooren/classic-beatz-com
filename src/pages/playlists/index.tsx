import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {Layout, Flex, Cell, Paragraph} from "../../components/Layout";
import Playlists from "../../components/Playlists";

const introduction = [
    "### Hey there, props for popping into our playlist palace!",
    "You’ve stumbled upon the inner sanctum of classical mash-ups, much like the one we've got" +
    " spinning on the home page.",
    "Each medley's got its own spot here, with a tap-ready link to whisk you off to its special page.",
]

function Page() {
    const seo = {}

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={["Listening Lab with Maestro Mixes"]} pageLabel="Playlists" seo={seo}>
            <Flex>
                <Cell>
                    <StaticImage
                        key="image-1"
                        src="../../images/male-listening-to-classical-music-playlist.jpg"
                        alt="Male listening to classical music playlist."
                        loading="eager"

                    />
                </Cell>
                <Cell>
                    <Paragraph sentences={introduction}/>
                </Cell>
                <Cell>
                    <Playlists/>
                </Cell>
            </Flex>
        </Layout>
    )
}

export default Page
