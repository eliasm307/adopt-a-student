// this config includes typescript specific settings
// and if you're not using typescript, you should remove `transform` property
module.exports = {
  preset: "ts-jest",

  testEnvironment: "node",
  verbose: false,
  /**/
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "@adopt-a-student/common": "<rootDir>/common/src/",
  },

  // testRegex: "src(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // testPathIgnorePatterns: ["lib/", "node_modules/"],
  /**/
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // rootDir: "src",
  // collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  moduleDirectories: ["node_modules", "src"],
  modulePathIgnorePatterns: [
    "\\/dist\\/",
    "\\/lib\\/",
    "\\/node_modules\\/",
    "\\/coverage\\/",
  ],
};
