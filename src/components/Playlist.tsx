import React, {ReactElement, useState} from 'react';
import {Layout, Paragraph, Flex, Cell}  from "./Layout";
import {AudioPlayer} from "./Audio";
import { Dispatcher } from './Dispatcher';
import TrackList from "../components/TrackList";
import {QuizMaker} from "../utils/QuizMaker";
import {PairsMaker} from "../utils/PairsMaker";
import Quiz from "../components/Quiz";
import Pairs from "../components/Pairs";
import GoogleAd from "../components/GoogleAd"
import makeTrackTitle from "../utils/makeTrackTitle";
import Playlists from "../components/Playlists"

interface MixSectionProps {
    data: any;
    imageElement: ReactElement
}

export const MixSection: React.FC<MixSectionProps> = ({data, imageElement}) => {
    for (const track of data.tracks) {
        track.title = makeTrackTitle(track)
    }

    const compositionPairsMakerObj = useState(() => {
        const obj = new PairsMaker()

        for (let t of data.tracks) {
            obj.add(0, t.composition, t.annotations)
        }

        return obj
    })

    let composerPairsMakerObj = undefined

    if ('composers' in data) {
        composerPairsMakerObj = useState(() => {

            const obj = new PairsMaker()

            for (let c in data.composers) {
                obj.add(0, c, data.composers[c].annotations)
            }

            return obj
        })
    }

    const quizMakerObj = useState(() => {
        const obj = new QuizMaker()
        obj.addTrackLists(data.tracks, data.composers, data.quizItemTypes)
        return obj
    })

    for (const track of data.tracks) {
        track.title = makeTrackTitle(track)
    }

    return (
        <Dispatcher>
            <Flex>
                <Cell>
                    {imageElement[0]}
                </Cell>
                <Cell>
                    <Paragraph sentences={data.mixIntro}/>
                </Cell>
                <Cell>
                    <AudioPlayer tracks={data.tracks}/>
                </Cell>
                <Cell>
                    {imageElement[1]}
                </Cell>
                <Cell>
                    <Paragraph sentences={data.compositionsIntro}/>
                </Cell>
                <Cell>
                    <TrackList tracks={data.tracks}/>
                </Cell>
                <Cell classNames="cellTopMargin">
                    {imageElement[2]}
                </Cell>
                <Cell>
                    <GoogleAd/>
                </Cell>
                <Cell>
                    <Paragraph sentences={data.quizIntro}/>
                </Cell>
                <Cell>
                    <Quiz buttonLabel="Go Quiz" quizMakerObj={quizMakerObj[0]}/>
                </Cell>
                {data.pairCompositionIntro && <>
                    <Cell>
                        <GoogleAd/>
                    </Cell>
                    <Cell>
                        <Paragraph sentences={data.pairCompositionIntro}/>
                    </Cell>
                    <Cell>
                         <Pairs buttonLabel="Pair the Pieces" instruction={data.pairCompositionInstruction} pairsMakerObj={compositionPairsMakerObj[0]}/>
                    </Cell>
                </>}
                {data.pairComposerIntro && <>
                    <Cell>
                        <GoogleAd/>
                    </Cell>
                    <Cell>
                        <Paragraph sentences={data.pairComposerIntro}/>
                    </Cell>
                    <Cell>
                        <Pairs buttonLabel="Match the Maestros" instruction={data.pairComposerInstruction} pairsMakerObj={composerPairsMakerObj[0]}/>
                    </Cell>
                </>}
                {data.playlistsIntro && <>
                    <Cell classNames="cellTopMargin">
                        {imageElement[3]}
                    </Cell>
                    <Cell>
                        <GoogleAd/>
                    </Cell>
                    <Cell>
                        <Paragraph sentences={data.playlistsIntro}/>
                    </Cell>
                    <Cell>
                        <Playlists exclude={data.title}/>
                    </Cell>
                </>}
            </Flex>
        </Dispatcher>
    )
}

interface MixPageProps {
    data: any;
    imageElement: ReactElement
}

export const Playlist: React.FC<MixPageProps> = ({data, imageElement}) => {
    let seo = data.seo

    return (
        <Layout pageTitle={data.title} headerTitle={data.title} seo={data}>
            <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

//export const Head: HeadFC = () => <title>Home Page</title>
