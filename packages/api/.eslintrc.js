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
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
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
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/no-unsafe-return": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/require-await": 1,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/unbound-method": 0,
    "import/export": 1,
    "import/no-unresolved": 1,
    "linebreak-style": 0,
    "new-cap": 0,
    "no-var": 1,
    "quote-props": 0,
    "require-jsdoc": 0, // todo enable later
    "spaced-comment": 1,
    "valid-jsdoc": 0,
    quotes: 0,
  },
};
