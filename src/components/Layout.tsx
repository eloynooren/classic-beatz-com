import React, {ReactNode} from 'react'
import {Link as GatsbyLink} from "gatsby";
import { Tooltip as ReactTooltip } from 'react-tooltip';
import makeRandomHtmlId from '../utils/makeRandomHtmlId'
import useDeviceWidth from './UseDeviceWidth';
import * as styles from './Layout.module.css'
import { StaticImage } from "gatsby-plugin-image"
import {Tab, TabList, TabPanel} from "react-tabs";
import {Section} from "./Section";
import {IoAdd, IoMan, IoHome, IoMusicalNote, IoMusicalNotes} from "react-icons/io5";


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
    lines: string[]
    classNames?: string
}

function textFormatter(text: string): React.ReactNode {
    if (text.startsWith('####')) {
        return <h3>{text.slice(4).trim()}</h3>;
    } else if (text.startsWith('###')) {
        return <h2>{text.slice(3).trim()}</h2>;
    }

    const parts = text.split(/(\*\*.+?\*\*)/g);

    return (
        <span>
          {parts.map((part, index) =>
              part.startsWith('**') && part.endsWith('**')
                  ? <strong key={index}>{part.slice(2, -2)}</strong>
                  : part
          )}
        </span>
    );
}


export const Paragraph: React.FC<ParagraphProps> = ({lines, classNames}) => {
    let className = [styles.paragraph]

    if (classNames) {
        if (classNames.includes('paragraphBold')) {
            className.push(styles.paragraphBold)
        }
        if (classNames.includes('paragraphItalic')) {
            className.push(styles.paragraphItalic)
        }
        if (classNames.includes('paragraphLeftAlign')) {
            className.push(styles.paragraphLeftAlign)
        }
    }

    return (
        <div className={className.join(' ')}>
            {textFormatter(lines.join(' '))}
        </div>
    )
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
                <Paragraph key={index} lines={paragraph} classNames={innerClassNames[index]}/>
            ))}
        </div>
    )
}

interface LinkProps {
    url : string;
    children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({url, children}) => {
    return (
        <div className={styles.linkButton}>
            <GatsbyLink to={url}  className={styles.link}>
                {children}
            </GatsbyLink>
        </div>
    )
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
    console.log("TopMenu", current)
    return (
        <div className={styles.topMenu}>
            <Link url={'/'}>
                <div className={current === 'Home' ? styles.topMenuActive : ""}>Home</div>
            </Link>
            <Link url={'/Composers'}>
                <div className={current === 'Composers' ? styles.topMenuActive : ""}>Composers</div>
            </Link>
            <Link url={'/Compositions'}>
                <div className={current === 'Compositions' ? styles.topMenuActive : ""}>Tracks</div>
            </Link>
            <Link url={'/Medleys'}>
                <div className={current === 'Medleys' ? styles.topMenuActive : ""}>Medleys</div>
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
            <Link url={'/composers'}>
                <div className={styles.bottomMenuIcon}><IoMan/></div>
                <div className={styles.bottomMenuLabel}
                >Composers</div>
            </Link>
            <Link url={'/compositions'}>
                <div className={styles.bottomMenuIcon}><IoMusicalNotes/></div>
                <div className={styles.bottomMenuLabel}>Compositions</div>
            </Link>
            <Link url={'/medleys'}>
                <div className={styles.bottomMenuIcon}><IoMusicalNote/><IoAdd/></div>
                <div className={styles.bottomMenuLabel}>Medleys</div>
            </Link>
        </div>
    )
}

interface LayoutProps {
    pageTitle: string;
    headerTitle: string[];
    pageLabel?:  string;
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ pageTitle, headerTitle, pageLabel, children }) => {
    console.log("Layout", pageLabel)
    const [deviceWidth, windowWidth] = useDeviceWidth();

    return (
        <div>
            <header>
                <title>{pageTitle}</title>

                {deviceWidth < 768 ? (
                    <div>
                        <Link url='/'><StaticImage src="../images/logo.png" alt={"logo"}/></Link>
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
                <h1>{headerTitle.map((part, index) => [part.toUpperCase(), <wbr key={index}/>, ' ']).flat().slice(0, -2)}</h1>
                {/* device-width={deviceWidth} window-width={windowWidth} --> */}
                <div className={styles.layoutContent}>{children}</div>
                <div className={styles.layoutFiller}/>
                {deviceWidth < 768 && <BottomMenu/>}
            </main>

        </div>
    )
}
