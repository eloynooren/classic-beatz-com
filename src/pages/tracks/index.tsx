import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import homePage from "../../utils/data/medleys/home-page"
import pianoSolos from "../../utils/data/medleys/piano-solos"
import {Layout, Flex, Cell, Paragraph} from "../../components/Layout";
import TrackList from "../../components/TrackList";
import { Dispatcher } from '../../components/Dispatcher';


const intro = [
    "### Hey, rhythm riders! Slide into our composition playground!",
    "Here’s where all our tracks are lined up and waiting for you.",
    "Tap on any track title, and bam",
    "– you land on a page brimming with rad stories and all the juicy info on that track.",
    "And if you wanna get a taste of the tune first, just smash that play button and groove to the beat!"
]

const conclude = [
    "### Peeps, listen up. We've got a solid tip for you.",
    "Hit up those [medley|/medleys] pages.",
    "They're like a VIP tour through the universe of classical jams, flaunting all the killer tracks we've got stashed."
]

const seo = {
    "description": "Yo, get the dope on the flyest classical tracks! From symphonies that slap to operas that'll make ya cry, we got the 411 on 'em all. Click away, peeps!",
    "og:title": "Classical Jams Exposed - Get the Skinny on the Sickest Scores!",
    "og:description": "Dive deep into the heart of classical bangers! Each click drops another bomb story behind the tunes that shook the world. No fluff, just the good stuff.",
    "twitter:title": "Epic Classical Beats Unleashed - The Stories Behind the Notes 🎵",
    "twitter:description": "Ever wonder why Beethoven's beats bang so hard or why Mozart's melodies are mad tight? Hit us up for that rich backstory and more. #ClassicalCool #MusicWithAStory"
}



function Page() {
    const tracks = [...homePage(), ...pianoSolos()].sort((a, b) => {
        if (a.composer === b.composer) {
            return a.composition.localeCompare(b.composition);
        }
        return a.composer.localeCompare(b.composer);
    });
    console.log(tracks)
    return (
        <Layout pageTitle="Classical Beatz" headerTitle={["Quick Spin Through the Jams"]} pageLabel="Tracks" seo={seo}>
            <Dispatcher>
                <Flex>
                    <Cell>
                        <StaticImage
                            key="image-1"
                            src="../../images/beethoven-composing-a-track.jpg"
                            alt="Beethoven composing a track.jpg."
                        />
                    </Cell>
                    <Cell>
                        <Paragraph sentences={intro}/>
                    </Cell>
                    <Cell>
                        <TrackList tracks={tracks}/>
                    </Cell>
                    <Cell>
                        <Paragraph sentences={conclude}/>
                    </Cell>
                </Flex>
            </Dispatcher>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
