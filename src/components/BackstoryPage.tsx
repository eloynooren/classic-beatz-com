import React, {ReactElement} from 'react';
import {Layout, Flex} from "./Layout";
import {Section} from "./Section";
import { Dispatcher } from './Dispatcher';
import * as styles from './BackstoryPage.module.css'
import Tabs from './Tabs'
import makeTabSpecs from '../utils/makeTabSpecs'


const Image: React.FC<{image: ReactElement}> = ({ image }) => {
    return <div className={styles.imageContainer}>{image}</div>
}

interface BackstoryPageProps {
    data: any;
    imageElements: { [key: string]: ReactElement }
}

export const BackstoryPage: React.FC<BackstoryPageProps> = ({data, imageElements}) => {
    const tabSpecs = makeTabSpecs(data, 'backstory')

    return (
        <Layout pageTitle={data.composer + ": " + data.composition} headerTitle={data.header} seo={data}>
            <Dispatcher>
                <Flex>
                    <Image image={imageElements['best-moments']}/>
                    {'introduction' in data && <div className={styles.caption}>{data['introduction']}</div>}
                    <Tabs tabs={tabSpecs}/>
                    <Section paragraphs={data['backstory']} pairs={{}}/>
                </Flex>
            </Dispatcher>
        </Layout>
    )
}

export default BackstoryPage
