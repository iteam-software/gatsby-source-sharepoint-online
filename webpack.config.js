const path = require("path");

const pluginPath = "plugins/gatsby-source-sharepoint-online";

module.exports = {
  target: "node",
  entry: "./src",
  output: {
    filename: "gatsby-node.js",
    path: path.resolve(__dirname, pluginPath),
  },
  plugins: [],
};
