import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Flex, Paragraph} from "./Layout";
import {Section} from "./Section";
import {Images} from "../utils/Images"
import { Dispatcher } from './Dispatcher';
import * as styles from './CompositionPage.module.css'
import {pickRandom} from "../utils/pickRandom";
import {QuizMaker} from "../utils/QuizMaker";
import {PairsMaker} from "../utils/PairsMaker";
import {Track} from "../types/Track"


const someTracksIntros = [
    "Yo, <COMPOSITION> is stacked with tracks, no joke.\nWe're only chattin' about a few, so just hit up a track and I'll break it down for ya to jam to.",
    "<COMPOSITION> is loaded with bangers, but we can't gab about 'em all.\nPick a track and I'll serve up the deets for your ears.",
    "Check it, <COMPOSITION> is full of tunes, but we ain't got time for all.\nTap a track and I'll dish out the listening guide.",
    "<COMPOSITION> got a ton of tracks, but we're only diving into a couple.\nClick one and let me lay down the listen guide for ya.",
    "Hey, <COMPOSITION> is crammed with cool tracks, but we can't cover 'em all.\nSelect one and I'll drop the listening lowdown.",
    "Yo, <COMPOSITION> is like a buffet of tracks, but we're just tasting a few.\nClick a track and I'll serve you the audio appetizer.",
    "<COMPOSITION>'s got loads of tracks, but we're only peepin' a few.\nChoose a track and I'll guide you through the sound journey.",
    "<COMPOSITION> is like a treasure trove of tracks, but we can't dig into all.\nPick a track and I'll unravel its sonic secrets for ya.",
    "Look, <COMPOSITION> has a heap of tracks, but we're just skimming the surface.\nClick one and I'll walk you through the listening vibes.",
    "Aight, <COMPOSITION> is jam-packed with hits, but we're only spotlighting a few.\nSelect a track and I'll give you the 411 on it."
]

const allTracksIntros = [
    "<COMPOSITION> is rocking <N> movements, no cap.\nJust tap a title and I'll slide its guide right to ya.",
    "<COMPOSITION> is loaded with <N> movements, for real.\nHit up a movement's title and I'll pop up its listen guide like magic.",
    "Yo, <COMPOSITION> is packing <N> movements.\nWanna dive in? Click a title and I'll drop the deets with the listen guide.",
    "<COMPOSITION> got <N> movements, each one a banger.\nClick on a title and I'll serve you the scoop with its listen guide.",
    "Hey, <COMPOSITION> is stacked with <N> killer movements.\nSelect a title and I'll break down its listen guide for ya.",
    "<COMPOSITION> comes with <N> epic movements.\nTap a title and I'll unveil its listen guide, all fresh and ready.",
    "Check it, <COMPOSITION> is all about <N> movements.\nChoose a title and I'll hit you up with its dope listen guide.",
    "Aight, <COMPOSITION> is bringing <N> movements to the table.\nClick a title and I'll hook you up with its listen guide, no sweat.",
    "Look, <COMPOSITION> has got <N> movements, each with its own vibe.\nTap a title and I'll roll out the red carpet with its listen guide.",
    "<COMPOSITION> is buzzing with <N> movements.\nClick on any title and I'll lay out its listen guide, straight up."
]





function complete_quiz(data: any, quizMakerObj: any) {
    let tracks: Track[] = []

    if ('tracks' in data && 'audio' in data) {
        for (let src of Object.values(data.audio)) {
            if (typeof src === "string") {
                let match = src.match(/fragment-(\d+)-\d+-\d+\.mp3/)
                if (match && match[1]) {
                    let track_id = match[1]

                    if (track_id in data.tracks) {
                        let annotations = []

                        if ('annotations' in data.tracks[track_id]) {
                            annotations = Object.keys(data.tracks[track_id].annotations)
                        }

                        if (track_id in data.tracks) {
                            tracks.push({
                                    composer: '',
                                    composition: '',
                                    src: src,
                                    url: '',
                                    title: data.tracks[track_id].title,
                                    annotations: annotations
                                }
                            )
                        }
                    }
                }
            }
        }
    }

    if (!quizMakerObj) {
        quizMakerObj = new QuizMaker()
    }

    quizMakerObj.addTrackLists(tracks, [], ['WHAT-HEAR'])

    if ("tracks" in data && "trackType" in data && data['trackType'] == 'movement') {
        const ordinals =  ["", "1st", "2nd", "3rd", "4th", "5th", "6th"]
        const tracks = Object.fromEntries(Object.entries(data.tracks).map(([k, v]) => [ordinals[k] + ' movement', v.title]));

        if (Object.keys(tracks).length > 1) {
            quizMakerObj.addWhatNameQuestions(Object.keys(tracks).length, tracks)
        }
    }

    return quizMakerObj
}

const Image: React.FC<{image: ReactElement}> = ({ image }) => {
    return <div className={styles.imageContainer}>{image}</div>
}

interface CompositionPageProps {
    data: any;
    imageElements: { [key: string]: ReactElement }
    quizMakerObj: QuizMaker;
}

export const CompositionPage: React.FC<CompositionPageProps> = ({data, imageElements, quizMakerObj}) => {
    quizMakerObj = complete_quiz(data, quizMakerObj)
    let pairsMakerObjList = []

    if ('pairs' in data) {
        for (let p of data.pairs) {
            const pairsMakerObj = new PairsMaker()

            if ('annotations' in p) {
                for (let k of Object.keys(p.annotations)) {
                    pairsMakerObj.add(0, k, p.annotations[k])

                }
            } else {
                for (let m in data.tracks) {
                    if ('annotations' in data.tracks[m]) {
                        pairsMakerObj.add(0, data.tracks[m].title, data.tracks[m].annotations)
                    }
                }
            }

            pairsMakerObjList.push(pairsMakerObj)
        }
    }

    let seo = 'seo' in data ? data.seo : {}
    seo['og:url'] = "https://classicalbeatz.com" + data.canonical
    seo['og:image'] = "https://classicalbeatz.com/images" + data.canonical + ".jpg"
    seo['twitter:image'] = "https://classicalbeatz.com/images" + data.canonical + ".jpg"

    return (
        <Layout pageTitle={data.composer + ": " + data.composition} headerTitle={data.header} seo={seo}>
            <Dispatcher>
                <Flex>
                    <Image image={imageElements['best-moments']}/>
                    {'introduction' in data && <div className={styles.caption}>{data['introduction']}</div>}
                    <Tabs selectedTabClassName={styles.selectedTab}  className={styles.tabs}>
                        <TabList className={styles.tabList}>
                            {'best-moments' in data && <Tab className={styles.tab}>Best Moments</Tab>}
                            {'backstory' in data && <Tab className={styles.tab}>Backstory</Tab>}
                            {'plot' in data && <Tab className={styles.tab}>Plot</Tab>}
                            {('listen-guide' in data) && <Tab className={styles.tab}>Listen Guide</Tab>}
                            {('listen-guide-1' in data) && <Tab className={styles.tab}>Listen Guides</Tab>}
                            {'exam' in data && <Tab className={styles.tab}>Exam</Tab>}
                        </TabList>
                        {'best-moments' in data && <TabPanel>
                            <Section paragraphs={data['best-moments']} type='best-moments' audio={data.audio}/>
                        </TabPanel>}
                        {'backstory' in data && <TabPanel>
                            <Section paragraphs={data['backstory']} type='' audio={data.audio}/>
                        </TabPanel>}
                        {'plot' in data && <TabPanel>
                            <Section paragraphs={data['plot']} type='plot' audio={data.audio}/>
                        </TabPanel>}
                        {('listen-guide' in data || 'listen-guide-1' in data) && <TabPanel>
                            {'trackType' in data && data['trackType'] == 'movement' ? (
                                <>
                                    <Tabs selectedTabClassName={styles.selectedTab0}>
                                        <TabList className={styles.tabList0}>
                                            {Object.keys(data.tracks)
                                                .sort()
                                                .map((key) =>
                                                    <Tab className={styles.tab0} key={key}>{data.tracks[key].title}</Tab>)
                                            }
                                        </TabList>

                                        {Object.keys(data.tracks)
                                            .sort()
                                            .map((key) =>
                                                <TabPanel key={key} >
                                                    {'spotify' in data && key in data.spotify ?
                                                        <Section paragraphs={data['listen-guide-' + key]} type=''
                                                                 spotify={data.spotify[key]}/> :
                                                        <Section paragraphs={data['listen-guide-' + key]} type=''/>
                                                    }
                                                </TabPanel>)
                                        }
                                    </Tabs>
                                </>
                            ) : (
                                <Section paragraphs={data['listen-guide']} type=''
                                    spotify={data.spotify}/>
                                )}
                        </TabPanel>}
                        {'exam' in data && <TabPanel>
                            <Section quizIntro={data.quizIntro} quizMakerObj={quizMakerObj} pairs={data.pairs}
                                     pairsMakerObjList={pairsMakerObjList}/>
                        </TabPanel>}
                    </Tabs>
                </Flex>
            </Dispatcher>
        </Layout>
    )
}

export default CompositionPage
