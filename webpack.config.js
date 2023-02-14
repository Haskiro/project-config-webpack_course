const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
console.log(isDev);

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
  resolve: {
    // поиск расширений файлов они не указаны явно
    extensions: [".js", ".json", ".png"],
    alias: {
      // добавление алиасов в проект
      "@models": path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    splitChunks: {
      // вынос повторяющихся модулей в отдельные вендоры
      chunks: "all",
    },
    runtimeChunk: "single",
  },
  devServer: {
    port: 4200,
    hot: isDev,
  },
  // все необходимые плагины, ставятся через ключевое слово new
  plugins: [
    // внутрь будут подключаться все актуальные версии скриптов
    new HTMLWebpackPlugin({
      // шаблон, который будет использовать webpack для сборки
      template: "./index.html",
    }),
    // Плагин для удаления старых версий файлов из папки dist
    new CleanWebpackPlugin(),
    // Плагин для переноса в папку dist различных картинок, иконок
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/favicon.ico"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
    // Плагин для создания отдельных файлов со стилями
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
    }),
  ],
  // добавление loaders
  module: {
    rules: [
      {
        // регулярка на соответствие файла паттерну
        test: /\.css$/,
        // какие в этом случае использовать loader ы
        // важен порядок, webpack читает справа налево
        // use: ["style-loader", "css-loader"], - стили внутри тега <style></style>
        // стили в отдельном файле
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
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
        // генерирование имени и пути
        generator: {
          filename: "assets/[hash][ext]",
        },
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
