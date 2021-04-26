/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// todo add site config

// todo add site
module.exports = {
  flags: { FAST_DEV: true },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-tsconfig-paths`,
    "gatsby-plugin-eslint",
    `gatsby-plugin-emotion`,
    "gatsby-plugin-sass",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/static/assets`,
      },
    },
  ],
};
