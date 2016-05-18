var gulp = require("gulp"),
  connect = require("gulp-connect"),
  opn = require("opn"),
  sass = require('gulp-sass');


//Запуск сервера с LiveReload

gulp.task('connect', function () {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8888
  });

  opn('http://localhost:8888');
});


// SCSS into CSS

gulp.task('sass', function () {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

//Работа с html
gulp.task('html', function () {
  gulp.src('./app/*.html').pipe(connect.reload());
});

//gulp.task('sass', function () {
//  gulp.src('./app/sass/**/*.scss').pipe(connect.reload());
//});

gulp.task('css', function () {
  gulp.src('./app/css/*.css').pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./app/js/*.js').pipe(connect.reload());
});


//Слежка
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/sass/**/*.scss'], ['sass']);
  gulp.watch(['./app/css/*.css'], ['css']);
  gulp.watch(['./app/js/*.js'], ['js']);
});

//Задача по-умолчанию
gulp.task('default', ['connect', 'watch']);