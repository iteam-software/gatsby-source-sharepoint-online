const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const outputPath = path.resolve(
  __dirname,
  "plugins/gatsby-source-sharepoint-online"
);

module.exports = {
  mode: "production",
  target: "node",
  entry: ["isomorphic-fetch", "./src/index.js"],
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "gatsby-node.js",
    path: outputPath,
    module: true,
    libraryTarget: "module",
    chunkFormat: "module",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-class-properties"],
            presets: [["@babel/preset-env", { targets: { esmodules: true } }]],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "LICENSE",
          to: outputPath,
        },
        {
          from: "index.js",
          to: outputPath,
        },
        {
          from: "README.md",
          to: outputPath,
        },
        {
          from: "package.json",
          to: outputPath,
          transform(content, path) {
            const pkg = JSON.parse(content.toString("utf-8"));
            delete pkg.devDependencies;
            return Buffer.from(JSON.stringify(pkg, null, 2), "utf-8");
          },
        },
      ],
    }),
  ],
};
