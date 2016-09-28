var gulp = require("gulp")
var uglify = require("gulp-uglify")
var minifycss = require("gulp-clean-css")
var clean = require("del")
var concat = require("gulp-concat")
var renameFile = require("gulp-rename");

gulp.task("cleanDist", function(){
    clean(["dist/css", "dist/js", "css/style.css", "js/app.js"]);
});

gulp.task("concatJS",['cleanDist'], function(){
    return gulp.src(['js/jquery.js', 'js/fastclick.js', 'js/foundation.js', 'js/foundation.equalizer.js', 'js/foundation.reveal.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task("concatCss",['concatJS'], function(){
    return gulp.src(['css/normalize.css', 'css/foundation.min.css', 'css/basics.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('css/'));
});

gulp.task("minifyJS",['concatCss'], function(){
    return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(renameFile('app.min.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task("minifyCss",['minifyJS'], function(){
    return gulp.src('css/style.css')
    .pipe(minifycss())
    .pipe(renameFile('style.min.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task("default", ['minifyCss'], function(){
    console.log('Done!');
})