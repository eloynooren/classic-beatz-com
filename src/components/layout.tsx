import React from 'react'
import logo from "../images/logo.png"
import * as styles from './layout.module.css'


interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
    return (
        <center>
            <header>
                <title>{pageTitle}</title>
                <div className={logo}>
                    <a href='/'><img src={logo}/></a>
                </div>
                <div className={styles.nav}>
                    <a className={styles.navlink} href='/'>Home</a>
                    <a className={styles.navlink} href='/composers'>Composers</a>
                    <a className={styles.navlink} href='/compositions'>Compositions</a>
                    <a className={styles.navlink} href='/instruments'>Instruments</a>
                </div>
            </header>
            <main>
                {children}
            </main>
        </center>
    )
}

export default Layout
