module.exports = {
  siteMetadata: {
    title: 'Classical Beatz',
    description: 'Get hip to the classics! Your go-to spot to break down Beethoven, chill with Chopin, jam to Bach, and groove with Mozart. No snobs, no jargon—just good ol\' classical music vibes. Discover playlists, history, and more. Tune in, turn up!',
    siteUrl: 'https://www.classicalbeatz.com',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
     {resolve: `gatsby-plugin-sharp`, options: {defaults: { breakpoints: [400], quality: 100 } } },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-7F63QQE4M7"],
        pluginConfig: {head: true}
      }
    }
  ]
}
