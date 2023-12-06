import React, {ReactNode} from 'react'
import ReactDOMServer from 'react-dom/server';
import {Link as GatsbyLink} from "gatsby";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import makeRandomHtmlId from '../utils/makeRandomHtmlId'
import useDeviceWidth from './UseDeviceWidth';
import * as styles from './Layout.module.css'
import { StaticImage } from "gatsby-plugin-image"
import {Tab, TabList, TabPanel} from "react-tabs";
import Seo from "./Seo";
import {IoAdd, IoMan, IoHome, IoMusicalNote, IoMusicalNotes, IoArrowForward} from "react-icons/io5";
import {clearCurrentlyHandledPendingQueryRuns} from "gatsby/dist/state-machines/query-running/actions";


interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    action: () => void;
}

export const Button: React.FC<ButtonProps> = ({ className, children, action }) => {
    if (!className) {
        className= styles.buttonDefault
    }

    return (
        <button className={className} onClick={action}>
            {children}
        </button>
    );
};

interface FlexProps {
    className?: string;
    children: React.ReactNode;
}

export const Flex: React.FC<FlexProps> = ({className, children}) => {
    if (!className) {
        className = styles.flexColumn
    }

    if (className === 'flex-column-space-around') {
        className = styles.flexColumnSpaceAround
    }

    return (
        <div className={className}>
            {children}
        </div>
    )
}


interface CellProps {
    children: React.ReactNode;
}

export const Cell: React.FC<CellProps> = ({children}) => {
    return (
        <div className={styles.cell}>
            {children}
        </div>
    )
}

interface ParagraphProps {
    sentences: string[]
    classNames?: string
}

function textFormatter(sentences: string[]): string {
    let sentences_ = []
    let bullet_list_active = false
    let bullet_active = false

    for (let sentence of sentences) {
        let sentence_ = sentence.replace(/####(.*?($|\n))/g, function(_, title) {
                                     return `<h3>${title.trim()}</h3>`})
                                .replace(/###(.*?($|\n))/g, function(_, title) {
                                     return `<h2>${title.trim()}</h2>`})
                                .replace(/\*(.*?)\*/g, function(_, text) {
                                    return `<b>${text}</b>`})
                                .replace(/:::(.*?)$/, (_, match) => match.replace(/ /g, '&nbsp;'))
                                .replace(/\[(.+)\|(.+)\]/g, function(_, text, url) {
                                    const link = ReactDOMServer.renderToString(
                                        <GatsbyLink to={url} className={styles.link}>
                                            {text}
                                        </GatsbyLink>)
                                    return `&nbsp;${link}&nbsp;`
                                })

        if (sentence_.startsWith('* ')) {
            if (!bullet_list_active) {
                bullet_list_active = true
                sentence_ = "<ul><li>" + sentence_.slice(2)
            } else {
                if (bullet_active) {
                    sentence_ = "</li><li>" + sentence_.slice(2)
                } else {
                    sentence_ = '<li>' + sentence_.slice(2)
                }
            }

            bullet_active = true
        } else if (sentence_.startsWith('<b>')) {
            // for plot
            if (!sentence_.endsWith("\n")) {
                sentence_ += "\n"
            }
        } else {
            if (bullet_list_active && !bullet_active) {
                bullet_list_active = false
                sentence_ = '</ul>' + sentence_
            }
        }

        if (sentence_.endsWith("\n")) {
            if (bullet_active) {
                sentence_ = sentence_.slice(0, -1) + "</li>"
                bullet_active = false
            } else {
                sentence_ = sentence_.slice(0, -1) + "<br/>"
            }
        }

        sentences_.push(sentence_)
    }

    if (bullet_active) {
        sentences[sentences.length - 1] += "</li>"
    }

    if (bullet_list_active) {
        sentences[sentences.length - 1] += "</ul>"
    }

    return sentences_.join(' ')
                     .replace(/\*\*(.*?)\*\*/g, function(_, segment) {
                         return `<strong>${segment.trim()}</strong>`})
                     .replace(/\n/g, "<br/>")
}


export const Paragraph: React.FC<ParagraphProps> = ({sentences, classNames}) => {
    let className = [styles.paragraph]

    if (classNames) {
        if (classNames.includes('paragraphJustify')) {
            className.push(styles.paragraphJustify)
        }

        if (classNames.includes('paragraphSpaceOutVertically')) {
            className.push(styles.paragraphSpaceOutVertically)
        }

        if (classNames.includes('paragraphHugeBottom')) {
            className.push(styles.paragraphHugeBottom)
        }
    }

    const html = textFormatter(sentences)
    return <div className={className.join(' ')} dangerouslySetInnerHTML={{ __html: html }}/>
}

export interface ParagraphsProps {
    paragraphs: string[][]
    classNames?: string
}

export const Paragraphs: React.FC<ParagraphsProps> = ({paragraphs, classNames}) => {
    let outerClassName = ''
    let innerClassNames = Array(paragraphs.length).fill("")


    if (classNames) {
        if (classNames.includes('firstBold')) {
            innerClassNames[0] += " paragraphBold"
        }
        if (classNames.includes('firstItalic')) {
            innerClassNames[0] += " paragraphItalic"
        }
        if (classNames.includes('secondItalic')) {
            innerClassNames[1] += " paragraphItalic"
        }
        if (classNames.includes('secondGray')) {
            innerClassNames[1] += " paragraphGray"
        }
        if (classNames.includes('leftAlign')) {
            innerClassNames = innerClassNames.map(e => e + " paragraphLeftAlign")
        }
    }

    return (
        <div className={outerClassName}>
            {paragraphs.map((paragraph,index) => (
                <Paragraph key={index} sentences={paragraph} classNames={innerClassNames[index]}/>
            ))}
        </div>
    )
}

interface LinkProps {
    url : string;
    children: React.ReactNode;
    arrow?: boolean
}

export const Link: React.FC<LinkProps> = ({url, children, arrow}) => {
    if (arrow) {
        return (
            <div className={styles.linkButton}>
                <GatsbyLink to={url} className={styles.linkWithArrow}>
                    {children}
                    <IoArrowForward className={styles.linkArrow}/>
                </GatsbyLink>
            </div>
        )
    } else {
        return (
            <GatsbyLink to={url} className={styles.link}>
                {children}
            </GatsbyLink>
        )
    }
}

interface TooltipProps {
    children: ReactNode;
    text: string;
    more_url: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text, more_url  }): React.ReactElement => {
    const id = makeRandomHtmlId();
    let lines = text.split("\\n")

    return (
        <div>
            <a key="tooltip-anchor" sx={{ variant: 'tooltip.container' }} data-tooltip-id={id} >{children}</a>
            <ReactTooltip key="tooltip"  id={id} type='success' effect='solid'>
                <div sx={{ variant: 'tooltip.text' }}>
                    <div>{lines[0]}</div>
                    {more_url && <a href={more_url}>Meer</a>}
                </div>
            </ReactTooltip>
        </div>
    )
}
interface TopMenuProps {
    current: string;
}

const TopMenu: React.FC<TopMenuProps> = ({ current }) => {
    return (
        <div className={styles.topMenu}>
            <Link url={'/'}>
                <div className={current === 'Home' ? styles.topMenuActive : ""}>Home</div>
            </Link>
            <Link url={'/playlists'}>
                <div className={current === 'Playlists' ? styles.topMenuActive : ""}>Playlists</div>
            </Link>
        </div>
    )
    return (
        <div className={styles.topMenu}>
            <Link url={'/'}>
                <div className={current === 'Home' ? styles.topMenuActive : ""}>Home</div>
            </Link>
            <Link url={'/composers'}>
                <div className={current === 'Composers' ? styles.topMenuActive : ""}>Composers</div>
            </Link>
            <Link url={'/tracks'}>
                <div className={current === 'Tracks' ? styles.topMenuActive : ""}>Tracks</div>
            </Link>
            <Link url={'/playlists'}>
                <div className={current === 'Playlists' ? styles.topMenuActive : ""}>Playlists</div>
            </Link>
        </div>
    )
}

export const BottomMenu = () => {
    return (
        <div className={styles.bottomMenu}>
            <Link url={'/'}>
                <div className={styles.bottomMenuIcon}><IoHome/></div>
                <div className={styles.bottomMenuLabel}>Home</div>
            </Link>
            <Link url={'/playlists'}>
                <div className={styles.bottomMenuIcon}><IoMusicalNote/><IoAdd/></div>
                <div className={styles.bottomMenuLabel}>Playlists</div>
            </Link>
        </div>
    )
    return (
        <div className={styles.bottomMenu}>
            <Link url={'/'}>
                <div className={styles.bottomMenuIcon}><IoHome/></div>
                <div className={styles.bottomMenuLabel}>Home</div>
            </Link>
            <Link url={'/composers'}>
                <div className={styles.bottomMenuIcon}><IoMan/></div>
                <div className={styles.bottomMenuLabel}
                >Composers</div>
            </Link>
            <Link url={'/tracks'}>
                <div className={styles.bottomMenuIcon}><IoMusicalNotes/></div>
                <div className={styles.bottomMenuLabel}>Tracks</div>
            </Link>
            <Link url={'/playlists'}>
                <div className={styles.bottomMenuIcon}><IoMusicalNote/><IoAdd/></div>
                <div className={styles.bottomMenuLabel}>Playlists</div>
            </Link>
        </div>
    )
}

interface LayoutProps {
    pageTitle: string;
    headerTitle: string[];
    pageLabel?:  string;
    seo?: any
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ pageTitle, headerTitle, pageLabel, seo, children }) => {
    const [deviceWidth, windowWidth] = useDeviceWidth();

    return (
        <div>
            {seo ? <Seo arg={seo} title={pageTitle}/> : <Seo title={pageTitle}/>}
            <header>
                {deviceWidth < 768 ? (
                    <div>
                        <Link url='/'><StaticImage src="../images/logo.png" alt={"logo"} loading="eager"/></Link>
                    </div>
                ) : (
                    <div className={styles.layoutLogoAndMenu}>
                        <div>
                            <Link url='/'><StaticImage src="../images/logo.png" alt={"logo"}/></Link>
                        </div>
                        <TopMenu current={pageLabel ? pageLabel : ''}/>
                    </div>
                )}

            </header>
            <main>
                <h1>
                    {deviceWidth < 99999 ? (
                        headerTitle.map((part, index) => [part.toUpperCase(), <br key={index}/>, ' ']).flat().slice(0, -2)
                    ) : (
                        headerTitle.map((part, index) => [part.toUpperCase(), <wbr key={index}/>, ' ']).flat().slice(0, -2)
                    )}
                </h1>
                <div className={styles.layoutContent}>{children}</div>
                <div className={styles.layoutFiller}/>
                {deviceWidth < 768 && <BottomMenu/>}
            </main>

        </div>
    )
}
