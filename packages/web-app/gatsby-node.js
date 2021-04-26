/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // todo look into using https://www.gatsbyjs.com/plugins/gatsby-plugin-create-client-paths

  // ! dont use optional chaining here, netlify node version is not compatible
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*";

    // Update the page.
    createPage(page);
  }
};
// to fix firebase issue in gatsby
// https://github.com/gatsbyjs/gatsby/issues/29012#issuecomment-817185831
exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /firebase/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
  /*
  actions.setWebpackConfig({
    // this was supposed to load react

    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],

    resolve: {
      alias: {
        path: require.resolve("path-browserify"),
      },

      fallback: {
        fs: false,
      },
    },
  });*/
};
