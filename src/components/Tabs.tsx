import React from "react";
import {Link} from "./Layout"
import {TabSpec} from '../types/TabSpec'
import * as styles from './Tabs.module.css'


interface TabProps {
    tab: TabSpec
}

const Tab: React.FC<TabProps> = ({tab}) => {
     if (tab.active) {
         return <span key={tab.label} className={styles.selectedTab}>{tab.label}</span>
     } else {
         return <Link key={tab.label} url={tab.url} className={styles.tab}>{tab.label}</Link>
     }
}

interface TabsProps {
    tabs: TabSpec[]
}

export const Tabs: React.FC<TabsProps> = ({tabs}) => {
    return (
        <div className={styles.tabs}>
            {tabs.map((tab, index) => (
                <Tab tab={tab}/>
            ))}
        </div>
    )
}

export default Tabs
