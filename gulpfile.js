const gulp = require("gulp");
const jsdoc = require("gulp-jsdoc3");
const connect = require("gulp-connect");
const webpack = require("webpack");
const path = require("path");

gulp.task("build", async () => {
  webpack({
    entry: ["babel-polyfill", path.join(__dirname, "src/bond-sdk-cards")],
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
      library: "BondCards",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.json$/,
          use: "json-loader",
        },
      ],
    },
    resolve: {
      extensions: ["", ".js"],
    },
  }).run((err, stat) => {
    if (err) {
      console.log("Error building application - ", err);
      return;
    }
    const statJson = stat.toJson();
    if (statJson.errors.length > 0) {
      console.log("Error building application - ", statJson.errors);
      return;
    }
    console.log("Application built successfully !");
  });
});

gulp.task("doc", (cb) => {
  gulp.src(["README.md", "src/*.js"], { read: false }).pipe(jsdoc(cb));
});

gulp.task("webserver", async () => {
  connect.server({
    port: 8081,
  });
});
