module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    typescript: {},
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/dist/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: 0,
    "linebreak-style": 0,
    "quote-props": 0,
    "import/no-unresolved": 1,
    "@typescript-eslint/no-namespace": 0,
    "no-var": 1,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-var-requires": 0,
    "spaced-comment": 1,
    "require-jsdoc": 0, // todo enable later
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
};
