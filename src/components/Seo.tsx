import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function Seo({ title, description, image, url, lang = "en" }) {
    const { site } = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
          }
        }
      }
    `
    );

    const metaDescription = description || site.siteMetadata.description;
    const defaultTitle = site.siteMetadata.title;
    const metaImage = `${site.siteMetadata.siteUrl}${image || site.siteMetadata.image}`;
    const metaUrl = url || site.siteMetadata.siteUrl;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title || defaultTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    property: `og:url`,
                    content: metaUrl,
                },
                {
                    property: `og:image`,
                    content: metaImage,
                },
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author || ``,
                },
                {
                    name: `twitter:title`,
                    content: title || defaultTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:image`,
                    content: metaImage,
                },
            ]}
        />
    );
}

export default Seo;
