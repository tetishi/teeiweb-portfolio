const { src, dest, watch, series, parallel } = require("gulp");

// 共通
const rename = require("gulp-rename");

// 読み込み先（階層が間違えていると動かないので注意）
const srcPath = {
    css: 'src/sass/**/*.scss',
    img: 'src/img/**/*',
    html: './*.html'
    // html: './**/*.html'
}

// 吐き出し先（なければ生成される）
const destPath = {
    css: 'css/',
    img: 'img/'
}

// ブラウザーシンク（リアルタイムでブラウザに反映させる処理）
const browserSync = require("browser-sync");
const browserSyncOption = {
    server: "./"
}
const browserSyncFunc = () => {
    browserSync.init(browserSyncOption);
}
const browserSyncReload = (done) => {
    browserSync.reload();
    done();
}

// Sassファイルのコンパイル処理（DartSass対応）
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob-use-forward');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext")
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browsers = [
    'last 2 versions',
    '> 5%',
    'ie = 11',
    'not ie <= 10',
    'ios >= 8',
    'and_chr >= 5',
    'Android >= 5',
]

const cssSass = () => {
    return src(srcPath.css)
        .pipe(sourcemaps.init())
        .pipe(
            plumber({
                errorHandler: notify.onError('Error:<%= error.message %>')
            }))
        .pipe(sassGlob())
        .pipe(sass.sync({
            includePaths: ['src/sass'],
            outputStyle: 'expanded'
        }))
        .pipe(postcss([cssnext(browsers)]))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(destPath.css))
        .pipe(notify({
            message: 'コンパイル出来たよ！',//文字は好きなものに変更してね！
            onLast: true
        }))
}

// 画像圧縮
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const imgImagemin = () => {
    return src(srcPath.img)
    .pipe(imagemin([
        imageminMozjpeg({quality: 80}),
        imageminPngquant(),
        imageminSvgo({plugins: [{removeViewbox: false}]})
        ],
        {
            verbose: true
        }
    ))
    .pipe(dest(destPath.img))
}

// ファイルの変更を検知
const watchFiles = () => {
    watch(srcPath.css, series(cssSass, browserSyncReload))
    watch(srcPath.img, series(imgImagemin, browserSyncReload))
    watch(srcPath.html, series(browserSyncReload))
}

// 画像だけ削除
const del = require('del');
const delPath = {
    // css: '../dist/css/',
    // js: '../dist/js/script.js',
    // jsMin: '../dist/js/script.min.js',
    img: './img/',
    // html: '../dist/*.html',
    // wpcss: `../${themeName}/assets/css/`,
    // wpjs: `../${themeName}/assets/js/script.js`,
    // wpjsMin: `../${themeName}/assets/js/script.min.js`,
    // wpImg: `../${themeName}/assets/images/`
}
const clean = (done) => {
    del(delPath.img, { force: true, });
    // del(delPath.css, { force: true, });
    // del(delPath.js, { force: true, });
    // del(delPath.jsMin, { force: true, });
    // del(delPath.html, { force: true, });
    // del(delPath.wpcss, { force: true, });
    // del(delPath.wpjs, { force: true, });
    // del(delPath.wpjsMin, { force: true, });
    // del(delPath.wpImg, { force: true, });
    done();
};


// npx gulpで出力する内容
exports.default = series(series(clean, cssSass, imgImagemin), parallel(watchFiles, browserSyncFunc));


// npx gulp del → 画像最適化（重複を削除）
// exports.del = series(series(clean, cssSass, imgImagemin), parallel(watchFiles, browserSyncFunc));






















// // const { src, dest, watch, parallel, series } = require("gulp")








// // gulpプラグインの読み込み
// const gulp = require("gulp");
// // Sassをコンパイルするプラグインの読み込み
// const sass = require("gulp-dart-sass")(require("sass"));
// const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
// const notify = require("gulp-notify"); // エラー発生時のアラート出力
// const browserSync = require("browser-sync"); //ブラウザリロード


// // const imagemin = require('gulp-imagemin');
// // const imageminJpegoptim = require('imagemin-jpegoptim');
// // const imageminOptipng = require('imagemin-optipng');
// // // const imageminGifsicle = require('imagemin-gifsicle');
// // const imageminSvgo = require('imagemin-svgo');

// // const browserSync = require("browser-sync");
// // const reload = browserSync.reload;

// // style.scssをタスクを作成する
// gulp.task("default", () => {
//     // style.scssファイルを監視
//     return gulp.watch("sass/**/*.scss", () => {
//         //style.scssの更新があった場合の処理

//         // style.scssファイルを取得
//         return (
//             gulp
//                 .src("sass/**/*.scss")
//                 // Sassのコンパイルを実行
//                 .pipe(
//                     sass({
//                         outputStyle: "expanded"
//                     })
//                     // Sassのコンパイルエラーを表示（これがないと自動的に止まってしまう）
//                     .on("error", sass.logError)
//                 )
//                 // cssフォルダー以下に保存
//                 .pipe(gulp.dest("css"))

//                 .pipe(browserSync.stream())
//                 .pipe(notify({
//                     message: "Sassをコンパイルしました！",
//                     onLast: true
//                 }))
//         );    
//     });
// });

// // // 画像を圧縮するタスク（JPEG）
// // gulp.task('imagemin-jpg', () =>
// //     // gulp.src('src/img/*.jpg')
// //     gulp.src('img/*.jpg')
// //         .pipe(imageminJpegoptim({ progressive: true, max: 80 })())
// //         .pipe(gulp.dest('img'))
// //         // .pipe(gulp.dest('dist/img'))
// // );

// // // 画像を圧縮するタスク（PNG）
// // gulp.task('imagemin-png', () =>
// //     // gulp.src('src/img/*.png')
// //     gulp.src('img/*.png')
// //         .pipe(imageminOptipng({ optimizationLevel: 5 })())
// //         .pipe(gulp.dest('img'))
// //         // .pipe(gulp.dest('dist/img'))
// // );

// // // 画像を圧縮するタスク（SVG）
// // gulp.task('imagemin-svg', () =>
// //     // gulp.src('src/img/*.svg')
// //     gulp.src('img/*.svg')
// //         .pipe(imageminSvgo()())
// //         .pipe(gulp.dest('img'))
// //         // .pipe(gulp.dest('dist/img'))
// // );

// // // デフォルトのタスクを定義
// // gulp.task('default', gulp.parallel('imagemin-jpg', 'imagemin-png', 'imagemin-svg'));





// // ローカルサーバー立ち上げ
// // const browserSyncFunc = () => {
// //     browserSync.init(browserSyncOption);
// // }

// // const browserSyncOption = {
// //   server: distBase
// // }
