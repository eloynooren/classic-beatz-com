import * as React from "react"
import data from '../data/index.json'
import Paragraphs from "../components/paragraphs";
import Layout from "../components/layout";
import Title from "../components/title";
import Grid from "../components/grid";
import Square from "../components/square";
import Image from "../components/image";
import rappers from "../images/rappers-playing-strings.png";
import rapperPlayingCello from "../images/rapper-playing-cello.png";
import AudioPlayer from "../components/audio_player";

console.log(data)

let tracks = [
    {
        src: 'https://docs.google.com/uc?export=open&id=1O-bNa08YbtwhXqSzpFjDnfpbjMBW37ea',
        title: 'Mozart: Eine kleine Nachtmusik',
        url: '/composition/mozart-eine-kleine-nachtmusik'
    }
]


function Page() {
    return (
        <Layout pageTitle="Classic Beatz">
            <Title title={data.title}/>
            <Grid>
                <Square>
                    <Paragraphs paragraphs={data.greeting} variant="firstParagraphBold"/>
                    <Paragraphs paragraphs={data.mix_intro}/>
                </Square>
                <Square>
                    <AudioPlayer tracks={tracks} template='TITLE'/>
                </Square>
                <Square>
                    <Image image={rappers}/>
                </Square>
                <Square>
                    <Paragraphs paragraphs={data.compositions_intro}  variant="firstParagraphBold"/>
                </Square>
                <Square>
                </Square>
                <Square>
                    <Image image={rapperPlayingCello}/>
                </Square>
            </Grid>
        </Layout>
    )
}

export default Page

//export const Head: HeadFC = () => <title>Home Page</title>
