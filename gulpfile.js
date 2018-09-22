var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    // tunnel: 'paysdev',
    online: true
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('build-css', function() {
  gulp.src('assets/scss/screen.scss')
		.pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
    }}))
    .pipe(sass({
			errLogToConsole: true,
			sourcemaps: true
    }))
    .pipe(autoprefixer('last 2 versions'))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/styles/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/styles/'));
});

gulp.task('default', ['build-css', 'browser-sync'], function() {
  gulp.watch('assets/scss/*.scss', ['build-css', browserSync.reload]);
  gulp.watch('*.html', browserSync.reload);
});
