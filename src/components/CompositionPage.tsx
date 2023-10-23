import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Flex} from "../components/Layout";
import {Section} from "../components/Section";
import {Images} from "../utils/Images"
import { Dispatcher } from './Dispatcher';
import * as styles from './CompositionPage.module.css'
import {QuizMaker} from "../utils/QuizMaker";
import {PairsMaker} from "../utils/PairsMaker";
import {Track} from "../types/Track"



function complete_quiz(data: any, quizMakerObj: any) {
    let tracks: Track[] = []

    if ('movements' in data) {
        for (let src of Object.values(data.audio)) {
            if (typeof src === "string") {
                let match = src.match(/fragment-(\d+)-\d+-\d+\.mp3/)
                if (match && match[1]) {
                    let movement_id = match[1]
                    tracks.push({
                            composer: '',
                            composition: '',
                            src: src,
                            url: '',
                            title: data.movements[movement_id].title,
                            annotations: Object.keys(data.movements[movement_id].annotations)
                        }
                    )
                }
            }
        }
    }

    if (!quizMakerObj) {
        quizMakerObj = new QuizMaker()
    }

    quizMakerObj.addTrackLists(tracks, [], ['WHAT-HEAR'])

    if ("movements" in data) {
        const ordinals =  ["", "1st", "2nd", "3rd", "4th", "5th", "6th"]
        const movements = Object.fromEntries(Object.entries(data.movements).map(([k, v]) => [ordinals[k] + ' movement', v.title]));

        if (Object.keys(movements).length > 1) {
            quizMakerObj.addWhatNameQuestions(Object.keys(movements).length, movements)
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
    const pairsMakerObj = new PairsMaker()

    for (let m in data.movements) {
        pairsMakerObj.add(0, data.movements[m].title, data.movements[m].annotations)
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
                            {'movements' in data.buttonLabels && <Tab className={styles.tab}>{data.buttonLabels['movements']}</Tab>}
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
                        {'movements' in data.buttonLabels && <TabPanel>
                            <Image image={imageElements['movements']}/>
                            <Tabs selectedTabClassName={styles.selectedTab0}>
                                <TabList className={styles.tabList0}>
                                    {Object.keys(data.movements)
                                        .sort()
                                        .map((key) =>
                                            <Tab className={styles.tab0} key={key}>{data.movements[key].title}</Tab>)
                                    }
                                </TabList>

                                {Object.keys(data.movements)
                                    .sort()
                                    .map((key) =>
                                        <TabPanel key={key} >
                                            <Section paragraphs={data.article[key]} type='' spotify={data.spotify[key]}/>
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
                            <Section quizIntro={data.quizIntro} quizMakerObj={quizMakerObj} pairsIntro={data.pairsIntro}
                                     pairsInstruction={data.pairsInstruction} pairsMakerObj={pairsMakerObj}/>
                        </TabPanel>}
                    </Tabs>
                </Flex>
            </Dispatcher>
        </Layout>
    )
}

export default CompositionPage
