import React, {ReactElement, useState, useEffect} from 'react';
import {Layout, Paragraph, Flex, Cell}  from "../components/Layout";
import {AudioPlayer} from "../components/Audio";
import TrackList from "../components/TrackList";
import {QuizMaker} from "../utils/QuizMaker";
import {PairsMaker} from "../utils/PairsMaker";
import Quiz from "../components/Quiz";
import Pairs from "../components/Pairs";
import GoogleAd from "../components/GoogleAd"
import makeTrackTitle from "../utils/makeTrackTitle";

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

    const composerPairsMakerObj = useState(() => {
        const obj = new PairsMaker()

        for (let c in data.composers) {
            obj.add(0, c, data.composers[c].annotations)
        }

        return obj
    })

    const quizMakerObj = useState(() => {
        const obj = new QuizMaker()
        obj.addTrackLists(data.tracks, data.composers, data.quizItemTypes)
        return obj
    })

    for (const track of data.tracks) {
        track.title = makeTrackTitle(track)
    }

    return (
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
            <Cell>
                <GoogleAd/>
            </Cell>
            <Cell>
                <Paragraph sentences={data.quizIntro}/>
            </Cell>
            <Cell>
                <Quiz buttonLabel={data.quizStartButtonLabel} quizMakerObj={quizMakerObj[0]}/>
            </Cell>
            <Cell>
                <GoogleAd/>
            </Cell>
            <Cell>
                <Paragraph sentences={data.pairCompositionIntro}/>
            </Cell>
            <Cell>
                 <Pairs buttonLabel={data.pairCompositionStartButtonLabel} pairsMakerObj={compositionPairsMakerObj[0]}/>
            </Cell>
            <Cell>
                <GoogleAd/>
            </Cell>
            <Cell>
                <Paragraph sentences={data.pairComposerIntro}/>
            </Cell>
            <Cell>
                <Pairs buttonLabel={data.pairComposerStartButtonLabel} pairsMakerObj={composerPairsMakerObj[0]}/>
            </Cell>
        </Flex>
    )
}

interface MixPageProps {
    data: any;
    imageElement: ReactElement
}

export const MixPage: React.FC<MixPageProps> = ({data, imageElement}) => {
    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.title}>
            <MixSection data={data} imageElement={imageElement}/>
        </Layout>
    )
}

//export const Head: HeadFC = () => <title>Home Page</title>
