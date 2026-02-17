module.exports = {
  transform: {
    "^.+\\.(jsx?|mjs)$": `<rootDir>/jest-preprocess.js`
  },
  moduleFileExtensions: ["jsx", "js", "mjs"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    "<rootDir>.*/cypress"
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby|query-string|decode-uri-component|split-on-first|filter-obj|node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill)/)`],
  globals: {
    __PATH_PREFIX__: ``
  },
  testEnvironmentOptions: {
    url: `http://localhost`
  },
  testMatch: ["**/*.test.mjs"],
  setupFiles: [`<rootDir>/loadershim.js`]
};
