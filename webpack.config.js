const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const outputPath = path.resolve(
  __dirname,
  "plugins/gatsby-source-sharepoint-online"
);

module.exports = {
  mode: "production",
  target: "node",
  entry: "./src",
  output: {
    filename: "gatsby-node.js",
    path: outputPath,
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-proposal-class-properties"],
            presets: [["@babel/preset-env", { targets: { esmodules: true } }]],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: "LICENSE",
        to: outputPath,
      },
      {
        from: "package.json",
        to: outputPath,
        transform(content, path) {
          const pkg = JSON.parse(content.toString("utf-8"));
          delete pkg.devDependencies;
          return new Buffer(JSON.stringify(pkg, null, 2), "utf-8");
        },
      },
    ]),
  ],
};
