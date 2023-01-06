const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  console.log("entryFiles", entryFiles);
  entryFiles.map((entryFile) => {
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    // console.log("pageName", pageName);
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]_[chunkhash:6].js",
    clean: true, // 清理输出目录
  },
  mode: "production",
  module: {
    rules: [
      { test: /.js$/, use: "babel-loader" },
      {
        test: /.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                    overrideBrowserslist: ["iOS 7.1", "last 2 versions", ">0%"],
                  }),
                ],
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /.(png|gif|jpg|jpeg|svg)$/,
        use: [
          {
            // loader: "url-loader",
            loader: "file-loader",
            options: {
              // limit: 10240, // 如果图片小于10k，则自动转换成base64格式
              name: "[name]_[hash:6].[ext]",
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:6].[ext]",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()].concat(
      htmlWebpackPlugins
    ),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:6].css",
    }),
    // new CleanWebpackPlugin()
  ],
};
