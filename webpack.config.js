import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(
  __dirname,
  "plugins/gatsby-source-sharepoint-online"
);

export default {
  mode: "production",
  target: "node",
  entry: ["isomorphic-fetch", "./src/index.js"],
  output: {
    filename: "gatsby-node.js",
    path: outputPath,
    library: {
      name: "gatsby-source-sharepoint-online",
      type: "commonjs-module",
    },
  },
  // externals: [nodeExternals()],
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           plugins: ["@babel/plugin-transform-class-properties"],
  //           presets: [
  //             [
  //               "@babel/preset-env",
  //               {
  //                 targets: { esmodules: true },
  //                 modules: false,
  //               },
  //             ],
  //           ],
  //         },
  //       },
  //     },
  //   ],
  // },
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
}
