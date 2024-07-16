const { src, dest, watch, parallel, series } = require("gulp")








// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

const b = require("browser-sync");

// style.scssをタスクを作成する
gulp.task("default", () => {
    // style.scssファイルを監視
    return gulp.watch("sass/**/*.scss", () => {
        //style.scssの更新があった場合の処理

        // style.scssファイルを取得
        return (
            gulp
                .src("sass/**/*.scss")
                // Sassのコンパイルを実行
                .pipe(
                    sass({
                        outputStyle: "expanded"
                    })
                    // Sassのコンパイルエラーを表示（これがないと自動的に止まってしまう）
                    .on("error", sass.logError)
                )
                // cssフォルダー以下に保存
                .pipe(gulp.dest("css"))
        );    
    });
});
