import React from 'react';
import { StaticImage } from "gatsby-plugin-image";
import {Layout, Flex, Cell, Paragraph} from "../../components/Layout";
import homePage from "../../utils/data/medleys/home-page";
import pianoSolos from "../../utils/data/medleys/piano-solos";
import {AudioPlayer} from "../../components/Audio";

const introduction = [
    "### Salutations, musical pilgrims, and welcome to our composers' haven!",
    "Behold the pantheon of classical maestros.",
    "Venture into the individual stories of these legendary composers, each illuminated with a brief showcase of their genius and a direct link for you to discover more about their musical realms."
    ]

const bach_teaser = [
    "Step into [Bach's World|/composers/bach] for an all-access pass to the maestro's life, from solo keys to full" +
    " orchestras. Explore the genius, the man, the legend—all things Bach in one grand experience."
]

const mozart_teaser = [
    "Wander into [Mozart's Universe|/composers/mozart] for a deep dive into the prodigy's journey, from symphonies" +
    " to sonatas.",
    "Discover Mozart's life, legacy, and the magic behind the music in one immersive exploration."
]

const beethoven_teaser = [
    "Plug into [Beethoven Unleashed|/composers/beethoven] to journey through the storm and passion of his life and" +
    " symphonies.",
    "Discover the maestro’s legacy, from thunderous concertos to intimate sonatas, in a tribute that resonates like" +
    " his timeless Fifth."
]

const tchaikovsky_teaser = [
    "Enter [Tchaikovsky's Tale|/composers/tchaikovsky] to explore the drama and passion behind the notes.",
    "Experience his life's symphony, from thunderous ballets to tender melodies, all in one captivating saga."
]

const chopin_teaser = [
    "Step into [Chopin's Chronicles|/composers/chopin] to unravel the poetry of the piano's poet.",
    "Journey through his life, nocturnes, and the delicate dance of his compositions in one harmonious narrative."
]

const seo = {
    "description": "Peek into the dopest gallery of classical music homies! Hit up stories on Mozart, Beethoven & the gang - no dusty libraries, just pure vibes here!",
    "og:title": "Classical Beats: The Greats Unplugged",
    "og:description": "Yo, check out da illest classical maestros! Dive deep into dem epic life stories. Where Beethoven's drama at? Got Mozart's shenanigans on lock? Find out now!.",
    "twitter:title": "Roll Call of Classical Music Legends",
    "twitter:description": "Get the lowdown on all the classical virtuosos. Tap in to explore the life, drama & genius of the cats who composed the soundtrack of history!"
}

function Page() {

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={["A Meet Up with the Tune Smiths"]} pageLabel="Composers" seo={seo}>
            <Flex>
                <Cell>
                    <StaticImage
                        key="image-1"
                        src="../../images/mozart-composing-a-track.jpg"
                        alt="Mozart composing a track."
                    />
                </Cell>
                <Cell>
                    <Paragraph sentences={introduction}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={bach_teaser}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={mozart_teaser}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={beethoven_teaser}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={tchaikovsky_teaser}/>
                </Cell>
                <Cell>
                    <Paragraph sentences={chopin_teaser}/>
                </Cell>
            </Flex>
        </Layout>
    )
}

export default Page
