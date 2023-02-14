const path = require("path");

module.exports = {
  mode: "development", // or production
  // входные точки, если одна, то вместо объекта можно поставить строку
  entry: {
    main: "./src/index.js",
    analytics: "./src/analytics.js",
  },
  output: {
    // название файла, pattern [name] для динамического создания имени,
    // pattern [contenthash] для создания имени на основе контента, чтобы избеждать возможных проблема с кэшэм
    filename: "[name].[contenthash].js",
    // куда все файлы складывать
    path: path.resolve(__dirname, "dist"),
  },
};
