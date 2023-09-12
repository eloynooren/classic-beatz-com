import React, {ReactElement} from 'react';
import {Layout, Paragraphs, Flex, Cell}  from "../components/Layout";
import {AudioPlayer} from "../components/Audio";
import TrackList from "../components/TrackList";
import {QuizMaker} from "../utils/QuizMaker";
import Quiz from "../components/Quiz";
import GoogleAd from "../components/GoogleAd"
import makeTrackTitle from "../utils/makeTrackTitle";

interface MixSectionProps {
    data: any;
    imageElement: ReactElement
}

export const MixSection: React.FC<MixSectionProps> = ({data, imageElement}) => {
    console.log(data)
    console.log(imageElement)

    for (const track of data.tracks) {
        track.title = makeTrackTitle(track)
    }

    let obj = new QuizMaker()
    obj.addTrackLists(data.tracks, data.composers, data.quiz_item_types)
    const quizItems = obj.getItems().slice(0, 2)
    const annotationTemplates = obj.getAnnotationTemplates()

    return (
        <Flex>
            <Cell>
                {imageElement[0]}
            </Cell>
            <Cell>
                <Paragraphs paragraphs={data.greeting} classNames="firstBold"/>
                <Paragraphs paragraphs={data.mix_intro}/>
            </Cell>
            <Cell>
                <AudioPlayer tracks={data.tracks}/>
            </Cell>
            <Cell>
                {imageElement[1]}
            </Cell>
            <Cell>
                <Paragraphs paragraphs={data.compositions_intro}  classNames="firstBold secondItalic secondGray"/>
            </Cell>
            <Cell>
                <TrackList tracks={data.tracks}/>
            </Cell>
            <Cell>
                <GoogleAd/>
            </Cell>
            <Cell>
                <Paragraphs paragraphs={data.quiz_intro}  classNames="firstBold"/>
            </Cell>
            <Cell>
                <Quiz items={quizItems} annotationTemplates={annotationTemplates}/>
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
