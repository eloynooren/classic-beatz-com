import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Flex, Paragraph} from "../components/Layout";
import {Section} from "../components/Section";
import {Images} from "../utils/Images"
import { Dispatcher } from './Dispatcher';
import * as styles from './CompositionPage.module.css'
import {QuizMaker} from "../utils/QuizMaker";
import {PairsMaker} from "../utils/PairsMaker";
import {Track} from "../types/Track"



function complete_quiz(data: any, quizMakerObj: any) {
    let tracks: Track[] = []

    if ('tracks' in data) {
        for (let src of Object.values(data.audio)) {
            if (typeof src === "string") {
                let match = src.match(/fragment-(\d+)-\d+-\d+\.mp3/)
                if (match && match[1]) {
                    let track_id = match[1]
                    console.log(data.tracks)
                    if (track_id in data.tracks) {
                        tracks.push({
                                composer: '',
                                composition: '',
                                src: src,
                                url: '',
                                title: data.tracks[track_id].title,
                                annotations: Object.keys(data.tracks[track_id].annotations)
                            }
                        )
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

    console.log(quizMakerObj)

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.header}>
            <Dispatcher>
                <Flex>
                    <Tabs selectedTabClassName={styles.selectedTab}  className={styles.tabs}>
                        <TabList className={styles.tabList}>
                            {'fragments' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['fragments']}</Tab>}
                            {'composition' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['composition']}</Tab>}
                            {'plot' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['plot']}</Tab>}
                            {'tracks' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['tracks']}</Tab>}
                            {'exam' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['exam']}</Tab>}
                            {'analysis' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['analysis']}</Tab>}
                        </TabList>
                        {'fragments' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['fragments']}/>
                            <Section paragraphs={data.article['fragments']} type='fragments' audio={data.audio}/>
                        </TabPanel>}
                        {'composition' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['composition']}/>
                            <Section paragraphs={data.article['composition']} type='' audio={data.audio}/>
                        </TabPanel>}
                        {'plot' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['plot']}/>
                            <Section paragraphs={data.article['plot']} type='plot' audio={data.audio}/>
                        </TabPanel>}
                        {'tracks' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['tracks']}/>
                            {'tracksIntro' in data &&
                                <Paragraph key={`tracks-intro`} sentences={data.tracksIntro}
                                    classNames="paragraphJustify paragraphSpaceOutVertically"/>
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
                                                <Section paragraphs={data.article[key]} type=''
                                                         spotify={data.spotify[key]}/> :
                                                <Section paragraphs={data.article[key]} type=''/>
                                            }
                                        </TabPanel>)
                                }
                            </Tabs>
                        </TabPanel>}
                        {'analysis' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['analysis']}/>
                            <Section paragraphs={data.article['analysis']} type='' spotify={data.spotify}/>
                        </TabPanel>}
                        {'exam' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['exam']}/>
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
