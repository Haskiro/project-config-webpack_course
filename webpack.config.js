const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // где лежат все необходимые файлы
  context: path.resolve(__dirname, "src"),
  mode: "development", // or production
  // входные точки, если одна, то вместо объекта можно поставить строку
  entry: {
    main: "./index.js",
    analytics: "./analytics.js",
  },
  output: {
    // название файла, pattern [name] для динамического создания имени,
    // pattern [contenthash] для создания имени на основе контента, чтобы избеждать возможных проблема с кэшэм
    filename: "[name].[contenthash].js",
    // куда все файлы складывать
    path: path.resolve(__dirname, "dist"),
  },
  // все необходимые плагины, ставятся через ключевое слово new
  plugins: [
    // внутрь будут подключаться все актуальные версии скриптов
    new HTMLWebpackPlugin({
      // шаблон, который будет использовать webpack для сборки
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  // добавление loaders
  module: {
    rules: [
      {
        // регулярка на соответствие файла паттерну
        test: /\.css$/,
        // какие в этом случае использовать loader ы
        // важен порядок, webpack читает справа налево
        use: ["style-loader", "css-loader"],
      },
      {
        // Использование изображений
        test: /\.(png|jp(e?)g|svg|gif)$/,
        type: "asset/resource",
      },
      {
        // Использование шрифтов
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        // Для xml
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        // Для csv
        test: /\.csv$/,
        use: ["csv-loader"],
      },
    ],
  },
};
