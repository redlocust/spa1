var gulp = require("gulp"),
  connect = require("gulp-connect"),
  opn = require("opn"),
  sass = require('gulp-sass');
  clean = require('gulp-clean');


//Запуск сервера с LiveReload

gulp.task('connect', function () {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8888
  });

  opn('http://localhost:8888');
});

gulp.task('img', function () {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./build/img'));
});

// SCSS into CSS

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

//Работа с html
gulp.task('html', function () {

  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build'));

  gulp.src('./build/*.html').pipe(connect.reload());

});

gulp.task('css', function () {

  gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('./build/css'));

  gulp.src('./build/css/*.css').pipe(connect.reload());

});

gulp.task('js', function () {

  gulp.src('./src/css/**/*.js')
    .pipe(gulp.dest('./build/js'));

  gulp.src('./build/js/*.js').pipe(connect.reload());

});


//Слежка
gulp.task('watch', function () {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/css/*.css'], ['css']);
  gulp.watch(['./src/js/*.js'], ['js']);
});

//Задача по-умолчанию
gulp.task('default', ['img', 'sass', 'html', 'css', 'js', 'connect', 'watch']);