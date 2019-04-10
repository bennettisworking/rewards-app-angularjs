const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const htmlmin = require('gulp-htmlmin');
const bower = require('gulp-bower');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'html'], function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("app/styles/*.scss", ['sass']);
    gulp.watch("app/scripts/*.js", ['jshint']);
    gulp.watch("app/*.*").on('change', browserSync.reload);
    gulp.watch("app/*.html", ['html']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/styles/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("dist/styles"))
        .pipe(browserSync.stream());
});

gulp.task('html', function(){
     return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['wiredep', 'serve']);

gulp.task('jshint', function() {
  return gulp.src('dist/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('wiredep', function () {
  gulp.src(['app/views/**/*']).pipe(gulp.dest('dist/views'));
  gulp.src(['app/scripts/**/*']).pipe(gulp.dest('dist/scripts'));
  gulp.src(['app/components/**/*']).pipe(gulp.dest('dist/components'));
  var wiredep = require('wiredep').stream;
  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

