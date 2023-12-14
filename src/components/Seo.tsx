import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function Seo({ arg, title, description, image, url, lang = "en" }) {

    const meta = [
        {
            property: `og:type`,
            content: `website`,
        },
        {
            property: `og:site_name`,
            content: `classicalbeatz.com`,
        },
        {
            property: `og:locale`,
            content: `en_US`,
        },
        {
            property: `twitter:card`,
            content: `summary_large_image`,
        },
        {
            property: `twitter:creator`,
            content: 'Classical Beatz',
        },
    ]

    if (arg) {
        for (const name in arg) {
            meta.push({ property: name, content: arg[name] })
        }
    }

    return (
        <Helmet
            htmlAttributes={{
                lang: "en"
            }}
            title={title}
            meta={meta}
        />
    );
}

export default Seo;
