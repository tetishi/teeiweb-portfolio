// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

// style.scssをタスクを作成する
gulp.task("default", () => {
    // style.scssファイルを取得
    reture (
        gulp
            .src("sass/style.scss")
            // Sassのコンパイルを実行
            .pipe(sass())
            // cssフォルダー以下に保存
            .pipe()
    )
})
