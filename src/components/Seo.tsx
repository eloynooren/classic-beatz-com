import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";


function makeTitle(data: any) {
    let title = ''
    if ('title' in data.seo) {
        title = data.seo.title
    } else if ('title' in data) {
        title = data.title
        if (Array.isArray(title)) {
            title = title.join(" ");
        }
    } else if ('composer' in data &&  'composition' in data ) {
        title = data.composer + ": " + data.composition

        const suffixMaxLen = 60 - title.length
        console.log(suffixMaxLen)

        const suffixes = [
            " | Street Edition: Quick & Edgy",
            " | Street Style Guide & Facts",
            " | Urban Style Guide & Facts",
            " | Streetwise Breakdown",
            " | Street Style Guide",
            " | Urban Style Guide",
            " | Street Edition",
            " | Hip Insights",
            " | Lowdown",
            " | 411"
        ]

        for (const suffix of suffixes) {
            if (suffix.length <= suffixMaxLen) {
                title += suffix;
                break;
            }
        }
    }

    return title
}


function Seo({ data }) {
    let image = ''
    let url = ''
    let meta = []
    let link = []
    let title = ''


    if (data && 'seo' in data) {
        if (!(data.canonical.startsWith('/') && data.canonical.endsWith('/'))) {
            throw new Error(`Canonical ${data.canonical} not starting or ending with a slash`)
        }

        url = "https://www.classicalbeatz.com" + data.canonical
        image = "https://www.classicalbeatz.com/images" + data.canonical.slice(0, -1) + ".jpg"

        if (data.canonical && data.canonical == '/') {
            url = "https://www.classicalbeatz.com"
            image = "https://www.classicalbeatz.com/images/index-4096.jpg"
        }

        title = makeTitle(data)

        meta = [
            {
                name: `description`,
                content: data.seo.description,
            },
            {
                name: `author`,
                content: 'Eloy Nooren',
            },
            {
                property: `og:title`,
                content: data.seo['og-title'],
            },
            {
                property: `og:description`,
                content: data.seo['og-description'],
            },
            {
                property: `og:type`,
                content: `website`,
            },
            {
                property: `og:url`,
                content: url,
            },
            {
                property: `og:image`,
                content: image,
            },
            {
                property: `og:site_name`,
                content: `Classical Beatz`,
            },
            {
                property: `og:locale`,
                content: `en_US`,
            },
            {
                name: `twitter:card`,
                content: `summary_large_image`,
            },
            {
                name: `twitter:title`,
                content: data.seo['twitter:title'],
            },
            //{
            //    name: `twitter:site`,
            //    content: data.seo['@ClassicalBeatz'],
            //},
            {
                name: `twitter:description`,
                content: data.seo['twitter:description'],
            },
            {
                name: `twitter:image:src`,
                content: image,
            },
            {
                name: `twitter:creator`,
                content: 'Classical Beatz',
            }
        ]

        link = [
            {
                rel: "canonical",
                href: url

            }
        ]
    }

    return (
        <Helmet
            htmlAttributes={{
                lang: "en"
            }}
            title={title}
            meta={meta}
            link={link}
        />
    );
}

export default Seo;
