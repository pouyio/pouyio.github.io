var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching css/html files
gulp.task('serve', ['styles'], function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch("css/style.css", ['styles']);
  gulp.watch(["./index.html", "app.js", "data.json"]).on('change', browserSync.reload);
});

gulp.task('styles', function() {
  gulp.src('css/style.css')
    .pipe(autoprefixer())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
});

// Default task
gulp.task('default', ['serve']);
