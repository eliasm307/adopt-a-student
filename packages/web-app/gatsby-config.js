/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// todo add site config

const siteConfig = {
  title: "Adopt a Student",
  keywords: [], // todo add key words
  description: "",
  author: "",
};

const { title } = siteConfig;

// todo add site
module.exports = {
  flags: { FAST_DEV: true },
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: title,
        short_name: title,
        start_url: "/",
        background_color: `#333`,
        theme_color: "#15BDD8",
        display: "minimal-ui",
        icon: `${__dirname}/static/assets/logo-only.png`,
      },
    },
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
