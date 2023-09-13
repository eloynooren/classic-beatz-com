import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Button, Flex} from "../components/Layout";
import {Section} from "../components/Section";
import {Images} from "../utils/Images"
import * as styles from './CompositionPage.module.css'


interface CompositionPageProps {
    data: any;
    imageElements: ReactElement[]
}


export const CompositionPage: React.FC<CompositionPageProps> = ({data, imageElements}) => {
    const images = new Images(data.images, imageElements)

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={data.header}>
            <Flex>
                <Tabs selectedTabClassName={styles.selectedTab}>
                    <TabList className={styles.tabList}>
                        <Tab>{data.buttonLabels['fragments']}</Tab>
                        <Tab>{data.buttonLabels['composition']}</Tab>
                        <Tab>{data.buttonLabels['movements']}</Tab>
                    </TabList>
                    <TabPanel>
                        <Section paragraphs={data.article['fragments']} type='fragments' audio={data.audio}
                                     images={images.get('fragments')}/>
                    </TabPanel>
                    <TabPanel>
                        <Section paragraphs={data.article['composition']} type='' audio={data.audio}
                                 images={images.get('composition')}/>
                    </TabPanel>
                    <TabPanel>
                        <Tabs selectedTabClassName={styles.selectedTab0}>
                            <TabList className={styles.tabList0}>
                                {Object.keys(data.buttonLabels)
                                    .filter(key => /^[0-9]/.test(key))
                                    .sort()
                                    .map((key) =>
                                        <Tab key={key}>{data.buttonLabels[key]}</Tab>)
                                }
                            </TabList>

                            {Object.keys(data.buttonLabels)
                                .filter(key => /^[0-9]/.test(key))
                                .sort()
                                .map((key) =>
                                    <TabPanel key={key} >
                                        <Section paragraphs={data.article[key]} type='' audio={data.audio}
                                                 images={images.get(key)}/>
                                    </TabPanel>)
                            }
                        </Tabs>
                    </TabPanel>
                </Tabs>
            </Flex>
        </Layout>
    )
}

export default CompositionPage
