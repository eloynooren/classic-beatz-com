import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Flex, Paragraph} from "./Layout";
import {Section} from "./Section";
import {Images} from "../utils/Images"
import { Dispatcher } from './Dispatcher';
import * as styles from './CompositionPage.module.css'
import {QuizMaker} from "../utils/QuizMaker";
import {PairsMaker} from "../utils/PairsMaker";
import {Track} from "../types/Track"



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
                    <Tabs selectedTabClassName={styles.selectedTab}  className={styles.tabs}>
                        <TabList className={styles.tabList}>
                            {'best-moments' in data && <Tab className={styles.tab}>Best Moments</Tab>}
                            {'backstory' in data && <Tab className={styles.tab}>Backstory</Tab>}
                            {'plot' in data && <Tab className={styles.tab}>Plot</Tab>}
                            {('listen-guide' in data || 'listen-guide-1' in data) && <Tab className={styles.tab}>Listen Guide</Tab>}
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
                                    {'tracksIntro' in data &&
                                        <Paragraph key={`tracks-intro`} sentences={data.tracksIntro}
                                            classNames="paragraphJustify paragraphHugeBottom"/>
                                    }
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
