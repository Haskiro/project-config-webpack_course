const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      // вынос повторяющихся модулей в отдельные вендоры
      chunks: "all",
    },
    runtimeChunk: "single",
  };

  if (isProd) {
    config.minimizer = [
      // Оптимизация js
      new TerserWebpackPlugin(),
      // Оптимизация css
      new CssMinimizerPlugin(),
    ];
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    "css-loader",
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const options = {
    // Используемые готовые пресеты
    presets: [
      [
        "@babel/preset-env",
        {
          // целевые браузеры
          targets: "> 0.25%, not dead",
          // добавление импортов полифилов в файлы
          useBuiltIns: "usage",
          // версия corejs
          corejs: 3,
        },
      ],
    ],
    // Добавление плагинов при необходимости
    plugins: [
      // '@babel/plugin-proposal-class-properties'
    ],
  };

  if (preset) options.presets.push(preset);

  return options;
};

const plugins = () => {
  const base = [
    // внутрь будут подключаться все актуальные версии скриптов
    new HTMLWebpackPlugin({
      // шаблон, который будет использовать webpack для сборки
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
      },
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
      filename: `styles/${filename("css")}`,
    }),
    // Плагин для поддержки eslint
    new ESLintPlugin({
      extensions: ["js", "jsx"],
    }),
  ];

  // Запуск анализа в production режиме
  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  // где лежат все необходимые файлы
  context: path.resolve(__dirname, "src"),
  mode: "development", // or production
  // входные точки, если одна, то вместо объекта можно поставить строку
  entry: {
    main: "./index.jsx",
    analytics: "./analytics.ts",
  },
  output: {
    // название файла, pattern [name] для динамического создания имени,
    // pattern [contenthash] для создания имени на основе контента, чтобы избеждать возможных проблема с кэшэм
    filename: `scripts/${filename("js")}`,
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
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  devtool: isDev ? "source-map" : "eval",
  // все необходимые плагины, ставятся через ключевое слово new
  plugins: plugins(),
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
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        // Использование изображений
        test: /\.(png|jp(e?)g|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: `assets/${filename("[ext]")}`,
        },
      },
      {
        // Использование шрифтов
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        // генерирование имени и пути
        generator: {
          filename: `assets/${filename("[ext]")}`,
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
      {
        // Использование babel для js файлов
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions(),
          },
        ],
      },
      {
        // Использование babel для ts файлов
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions("@babel/preset-typescript"),
          },
        ],
      },
      {
        // Использование babel для jsx файлов
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react"),
        },
      },
    ],
  },
};
