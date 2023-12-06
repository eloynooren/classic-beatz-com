import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {Layout, Flex, Cell, Paragraph, Link} from "../../components/Layout";
import homePage from "../../utils/data/playlists/home-page";
import pianoSolos from "../../data/playlists/piano-solos.json"
import symphonies from "../../data/playlists/symphonies.json"
import ballet from "../../data/playlists/ballet.json"
import bach from "../../data/playlists/bach.json"
import mozart from "../../data/playlists/mozart.json"
import beethoven from "../../data/playlists/beethoven.json"
import * as styles from './index.css'


const introduction = [
    "### Hey there, props for popping into our playlist palace!",
    "You’ve stumbled upon the inner sanctum of classical mash-ups, much like the one we've got" +
    " spinning on the home page.",
    "Each medley's got its own spot here, with a tap-ready link to whisk you off to its special page.",
]

const homePageTeaser = [
    "Kick back to the" +
    " [Home Page|/]" +
    " for a wild mix of all—from Mozart’s melodies to Verdi’s vibes. No theme, just pure classics."
]

const pianoSolosTeaser = [
    "Cruise on into" +
    " [" + pianoSolos['title'] + "|" + pianoSolos['canonical'] + "]" +
    " where Chopin to Mozart fly solo on piano. Pure classic pieces, one solo stream."
]

const bachTeaser = [
    "Strap in for a ride through" +
    " [" + bach['title'] + "|" + bach['canonical'] + "]" +
    " where the harpsichord riffs and the violins soar."
]

const symphoniesTeaser = [
    "Dive into" +
    " [" + symphonies['title'] + "|" + symphonies['canonical'] + "]" +
    " where Beethoven's boldness meets Tchaikovsky's tenderness. Experience the harmony where every note tells a story."
]

const mozartTeaser = [
    "Embark on a classical adventure in" +
    " [" + mozart['title'] + "|" + mozart['canonical'] + "]" +
    " and experience the magic of his musical legacy."
]

const balletTeaser = [
    "Grace your ears with the elegance of dance in" +
    " [" + ballet['title'] + "|" + ballet['canonical'] + "]" +
    " where the poise of ballet meets the majesty of classical music."
]

const beethovenTeaser = [
    "Step into a world of monumental soundscapes in" +
    " [" + beethoven['title'] + "|" + beethoven['canonical'] + "]" +
    " and immerse yourself in the profound depth of his musical genius."
]

const playLists = [
    pianoSolos,
    symphonies,
    ballet,
    bach,
    mozart,
    beethoven
]

function Page() {
    const seo = {}

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={["Listening Lab with Maestro Mixes"]} pageLabel="Playlists" seo={seo}>
            <Flex>
                <Cell>
                    <StaticImage
                        key="image-1"
                        src="../../images/mozart-and-beethoven-with-headphones.jpg"
                        alt="Mozart and Beethoven listening to classical music on headphones."
                        loading="eager"

                    />
                </Cell>
                <Cell>
                    <Paragraph sentences={introduction}/>
                </Cell>
                <Cell>
                    <div className={styles.list}>
                        <div>
                            {playLists.map((playList, index) => (
                                <div key={index} className={styles.row}>
                                    <Link url={playList['canonical']} arrow={true}>
                                        {playList['title']}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </Cell>
            </Flex>
        </Layout>
    )
}

export default Page
