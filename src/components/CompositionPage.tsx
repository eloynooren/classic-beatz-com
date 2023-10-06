import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Flex} from "../components/Layout";
import {Section} from "../components/Section";
import {Images} from "../utils/Images"
import * as styles from './CompositionPage.module.css'
import {QuizMaker} from "../utils/QuizMaker";
import {Track} from "../types/Track"
import pickRandom from "../utils/pickRandom";
import shuffleArray from "../utils/shuffleArray";



function complete_quiz(data: any, quiz: any) {
    let tracks: Track[] = []

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

    if (!quiz) {
        quiz = new QuizMaker()
    }

    quiz.addTrackLists(tracks, [], ['WHAT-HEAR'])

    if ("movements" in data) {
        const ordinals =  ["", "1st", "2nd", "3rd", "4th", "5th", "6th"]
        const movements = Object.fromEntries(Object.entries(data.movements).map(([k, v]) => [ordinals[k] + ' movement', v.title]));

        if (Object.keys(movements).length > 1) {
            quiz.addWhatNameQuestions(Object.keys(movements).length, movements)
        }
    }

    return quiz
}

const Image: React.FC<{image: ReactElement}> = ({ image }) => {
    return <div className={styles.imageContainer}>{image}</div>
}

interface CompositionPageProps {
    data: any;
    imageElements: ReactElement[];
    quiz?: any;
}

export const CompositionPage: React.FC<CompositionPageProps> = ({data, imageElements, quiz}) => {
    const images = new Images(data.images, imageElements)
    quiz = complete_quiz(data, quiz)
    pairMaker = PairMaker(7)

    for (let m in data.movements) {
        pairMaker.add(0, data.movements[m].title, data.movements[m].annotations)
    }

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.header}>
            <Flex>
                <Tabs selectedTabClassName={styles.selectedTab}  className={styles.tabs}>
                    <TabList className={styles.tabList}>
                        <Tab className={styles.tab}>{data.buttonLabels['fragments']}</Tab>
                        <Tab className={styles.tab}>{data.buttonLabels['composition']}</Tab>
                        <Tab className={styles.tab}>{data.buttonLabels['movements']}</Tab>
                        <Tab className={styles.tab}>{data.buttonLabels['exam']}</Tab>
                    </TabList>
                    <TabPanel>
                        <Image image={imageElements[0]}/>
                        <Section paragraphs={data.article['fragments']} type='fragments' audio={data.audio}/>
                    </TabPanel>
                    <TabPanel>
                        <Image image={imageElements[1]}/>
                        <Section paragraphs={data.article['composition']} type='' audio={data.audio}/>
                    </TabPanel>
                    <TabPanel>
                        <Image image={imageElements[2]}/>
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
                    </TabPanel>
                    <TabPanel>
                        <Image image={imageElements[3]}/>
                        <Tabs selectedTabClassName={styles.selectedTab0} className={styles.tabs}>
                            <TabList className={styles.tabList0}>
                                <Tab className={styles.tab0}>Quiz</Tab>
                                <Tab className={styles.tab0}>Match 'm</Tab>
                            </TabList>
                            <TabPanel>
                                <Section quizIntro={data.quizIntro} quiz={quiz}/>
                            </TabPanel>
                            <TabPanel>
                                <Section pairsIntro={data.pairsIntro} pairs={pairMaker.get()}/>
                            </TabPanel>
                        </Tabs>
                    </TabPanel>
                </Tabs>
            </Flex>
        </Layout>
    )
}

export default CompositionPage
