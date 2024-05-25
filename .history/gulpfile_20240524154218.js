// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

// style.scssをタスクを作成する
gulp.task("default", () => {
    // style.scssファイルを監視
    return gulp.watch("sass/**/*.scss", () => {
        //style.scssの更新があった場合の処理


    });
});
