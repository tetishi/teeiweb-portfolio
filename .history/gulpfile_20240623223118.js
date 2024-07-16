const { src, dest, watch, parallel, series } = require("gulp")








// gulpプラグインの読み込み
const gulp = require("gulp");
// Sassをコンパイルするプラグインの読み込み
const sass = require("gulp-sass")(require("sass"));

const imagemin = require('gulp-imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');
const imageminOptipng = require('imagemin-optipng');
// const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

const browserSync = require("browser-sync");
const reload = browserSync.reload;

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

// 画像を圧縮するタスク（JPEG）
gulp.task('imagemin-jpg', () =>
    gulp.src('src/images/*.jpg')
        .pipe(imageminJpegoptim({ progressive: true, max: 80 })())
        .pipe(gulp.dest('dist/images'))
);

// 画像を圧縮するタスク（PNG）
gulp.task('imagemin-png', () =>
    gulp.src('src/images/*.png')
        .pipe(imageminOptipng({ optimizationLevel: 5 })())
        .pipe(gulp.dest('dist/images'))
);

// 画像を圧縮するタスク（SVG）
gulp.task('imagemin-svg', () =>
    gulp.src('src/images/*.svg')
        .pipe(imageminSvgo()())
        .pipe(gulp.dest('dist/images'))
);

// デフォルトのタスクを定義
gulp.task('default', gulp.parallel('imagemin-jpg', 'imagemin-png', 'imagemin-svg'));
