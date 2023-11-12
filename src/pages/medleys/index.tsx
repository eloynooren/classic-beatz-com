import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {Layout, Flex, Cell, Paragraph} from "../../components/Layout";
import homePage from "../../utils/data/medleys/home-page";
import pianoSolos from "../../utils/data/medleys/piano-solos";
import {AudioPlayer} from "../../components/Audio";

const introduction = [
    "### Hey there, props for popping into our playlist palace!",
    "You’ve stumbled upon the inner sanctum of classical mash-ups, much like the one we've got" +
    " spinning on the home page.",
    "Each medley's got its own spot here, with a tap-ready link to whisk you off to its special page.",
]

const home_page_teaser = [
    "Kick back to the [Home Page|/] for a wild mix of all—from Mozart’s melodies to Verdi’s vibes. No theme, just pure classics."
]

const piano_solos_teaser = [
    "Cruise on into [A Tryst with Piano Solos|/medleys/piano-solos] where Chopin to Mozart fly solo on piano. Pure classic pieces, one solo stream."
]


function Page() {
    const seo = {}

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={["Listening Lab with Maestro Mixes"]} pageLabel="Medleys" seo={seo}>
            <Flex>
                <Cell>
                    <StaticImage
                        key="image-1"
                        src="../../images/mozart-and-beethoven-with-headphones.jpg"
                        alt="Mozart and Beethoven listening to classical music on headphones."
                    />
                </Cell>
                <Cell>
                    <Paragraph sentences={introduction}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={home_page_teaser}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={piano_solos_teaser}/>
                </Cell>
            </Flex>
        </Layout>
    )
}

export default Page
