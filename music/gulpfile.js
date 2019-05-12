var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify')
var less = require('gulp-less');
var debug = require('gulp-strip-debug');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');

var folder = {
    src: 'src/',
    dist: 'dist/'
}

var devMode = process.env.NODE_ENV !== "production";

gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
                    .pipe(connect.reload());
    if (!devMode) {
        page.pipe(htmlClean());
    }
    page.pipe(gulp.dest(folder.dist + 'html/'));
});

gulp.task('image', function () {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'));
});

gulp.task('css', function () {
    var css = gulp.src(folder.src + 'css/*')
                    .pipe(less()).pipe(connect.reload());
    var options = [autoprefixer()]
    if (!devMode) {
        options.push(cssnano());
    }
    css.pipe(postcss(options))
        .pipe(gulp.dest(folder.dist + 'css/'));
});

gulp.task('js', function () {
    var js = gulp.src(folder.src + 'js/*')
                .pipe(connect.reload());
    if (!devMode) {
        js.pipe(debug())
            .pipe(uglify());
    }
    js.pipe(gulp.dest(folder.dist + 'js/'));
});

gulp.task('server', function () {
    connect.server({
        port: 8888,
        livereload: true
    });
});

gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
})

gulp.task("default", ['html', 'css', 'js', 'image', 'server', 'watch']);