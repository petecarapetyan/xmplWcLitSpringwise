const browserSync = require("browser-sync").create();
const compression = require("compression");
const historyApiFallback = require("connect-history-api-fallback");

browserSync.init({
  single: true,
  server: {
    baseDir: "dist",
    index: "index.html",
  },
  files: ["dist/scripts/**", "dist/index.html"],
  middleware: [compression(), historyApiFallback()],
});
