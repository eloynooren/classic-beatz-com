exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    const typeDefs = `
    type SiteSiteMetadata {
      title: String!
      description: String!
      siteUrl: String!
      image: String
    }

    type Site {
      siteMetadata: SiteSiteMetadata
    }
  `

    createTypes(typeDefs)
}
