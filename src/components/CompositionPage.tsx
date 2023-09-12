import React, {ReactElement} from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Layout, Flex} from "../components/Layout";
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
                        <Tab>Buzz Moments</Tab>
                        <Tab>The Basics</Tab>
                        <Tab>The Details</Tab>
                    </TabList>
                    <TabPanel>
                        <Section paragraphs={data['buzz-moments']} type='fragments' audio={data.audio}
                                     images={images.get('buzz-moments')}/>
                    </TabPanel>
                    <TabPanel>
                        <Section paragraphs={data.basics} type='' audio={data.audio}
                                 images={images.get('basics')}/>
                    </TabPanel>
                    <TabPanel>
                        <Tabs selectedTabClassName={styles.selectedTab0}>
                            <TabList className={styles.tabList0}>
                                {Object.keys(data.movements).sort().map((key, index) =>
                                     <Tab key={key}>{data.movements[key]}</Tab>
                                )}
                            </TabList>
                            {Object.keys(data.movements).sort().map((key, index) =>
                                <TabPanel  key={key} >
                                    <Section paragraphs={data.details[key]} type='' audio={data.audio}
                                             images={images.get(key)}/>
                                </TabPanel>
                            )}
                        </Tabs>
                    </TabPanel>
                </Tabs>
            </Flex>
        </Layout>
    )
}

export default CompositionPage
