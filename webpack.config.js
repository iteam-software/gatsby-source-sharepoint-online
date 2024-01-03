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
  entry: ["isomorphic-fetch", "./src/index.mjs"],
  output: {
    filename: "gatsby-node.mjs",
    libraryTarget: "module",
    path: outputPath
  },
  experiments: {
    outputModule: true
  },
  externals: [
    nodeExternals({
      importType: "module"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["@babel/plugin-transform-class-properties"],
            presets: [
              [
                "@babel/preset-env"
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "LICENSE",
          to: outputPath
        },
        {
          from: "README.md",
          to: outputPath
        },
        {
          from: "package.json",
          to: outputPath,
          transform(content, _) {
            const pkg = JSON.parse(content.toString("utf-8"));
            delete pkg.devDependencies;
            return Buffer.from(JSON.stringify(pkg, null, 2), "utf-8");
          }
        }
      ]
    })
  ]
};
