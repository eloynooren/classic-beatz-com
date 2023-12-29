import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function Seo({ data }) {
    let image = ''
    let url = ''
    let meta = []
    let link = []
    let title = ''


    if (data && 'seo' in data) {
        url = "https://www.classicalbeatz.com/" + data.canonical
        image = "https://www.classicalbeatz.com/images/" + data.canonical + ".jpg"

        if (data.canonical && data.canonical == '/') {
            url = "https://www.classicalbeatz.com"
            image = "https://www.classicalbeatz.com/images/index-4096.jpg"
        }

        if ('title' in data.seo) {
            title = data.seo.title
        } else if ('title' in data) {
            title = data.title
        } else if ('composer' in data &&  'composition' in data ) {
            title = data.composer + ": " + data.composition
        }

        if (Array.isArray(title)) {
            title = title.join(" ");
        }

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
