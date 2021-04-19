// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // todo look into using https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*";

    // Update the page.
    createPage(page);
  }
};

const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    // this was supposed to load react
    /*
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],
    */
    resolve: {
      /*
      alias: {
        path: require.resolve("path-browserify"),
      },
      */
      fallback: {
        fs: false,
      },
    },
  });
};
