import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  mode: "production",
  entry: {
    contentScript: "./src/content/index.js",
    background: "./src/background/index.js",
    react: "./src/react/index.jsx",
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename : "styles.css",
      filename : "styles.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("manifest.json"),
          to: path.resolve("dist"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", "postcss-loader",
          ],
      },
    ],
  },
};
