import React, {ReactElement, useEffect, useState} from 'react';
import {Layout, Paragraph, Flex, Cell}  from "../components/Layout";
import pickRandom from "../utils/pickRandom";



const templates = [
    "Hey y'all, we're still cookin' this page up. Stay tuned!",
    "Page is under construction, fam. Holla back later.",
    "This spot's still brewin'. Check back soon!",
    "Yo, we ain't ready to drop this yet. Hang tight!",
    "Sorry, peeps, this page is still in the lab. Swing by later!",
    "We're still workin' the magic here, folks. Be back soon.",
    "Still jammin' on this content. Keep your eyes peeled!",
    "Hey homies, we're still tweakin' this. Check in later!",
    "Content's still in the oven. It ain't baked yet!",
    "Still grindin' on this one. Keep ya posted!",
    "This joint's not live yet. Keep an eye out!",
    "Page's still a work in progress. We're on it, don't sweat!",
    "Still whippin' up this page, fam. Come back soon!",
    "Yo, this spot’s under some reno. Hit us up later.",
    "Still layin' down the tracks. Stay tuned for the release!",
    "Ain't nothing to see here... yet. We're on it!",
    "This page is still gettin' dolled up. See ya soon!",
    "Sorry, this page is still in the garage. Rev up later!",
    "Page under wraps! Unveiling soon!",
    "Hang tight, we're still scribbling. Be right back!",
]

interface NotReadyYetPageProps {
    headerTitle: string[];
    imageElement: ReactElement
}



export const NotReadyYetPage: React.FC<NotReadyYetPageProps> = ({headerTitle, imageElement}) => {
    const [annotation, setAnnotation] = useState(pickRandom(templates));

    useEffect(() => {
        const interval = setInterval(() => {
            setAnnotation(pickRandom(templates))
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Layout pageTitle="Classical Beatz" headerTitle={headerTitle}>
            <Flex>
                <Cell>
                    {imageElement}
                </Cell>
                <Cell>
                    <div>
                        <Paragraph sentences={["**NOTICE**"]}/>
                        <Paragraph sentences={[annotation]}/>
                    </div>
                </Cell>
            </Flex>
        </Layout>
    )
}

export default NotReadyYetPage

//export const Head: HeadFC = () => <title>Home Page</title>
