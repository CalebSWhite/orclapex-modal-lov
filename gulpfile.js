var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var gutil = require('gulp-util')
var browserify = require('browserify')
var hbsfy = require('hbsfy')
var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var less = require('gulp-less')
var csso = require('gulp-csso')

gulp.task('javascript', function () {
  hbsfy.configure({
    extensions: ['hbs']
  })

  return browserify('src/js/fcs-modal-lov.js', {debug: true})
    .on('error', gutil.log)
    .transform(hbsfy)
    .on('error', gutil.log)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('fcs-modal-lov.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(streamify(uglify()))
    .on('error', gutil.log)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
    .on('error', gutil.log)
})

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/'))
    .pipe(gulp.dest('dist/'))
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', gulp.series('javascript', 'less', watch));

function watch() {
  gulp.watch([
    'src/js/fcs-modal-lov.js',
    'src/js/templates/**/*.hbs'
  ], gulp.series('javascript'))
  gulp.watch([
    'src/less/*.less'
  ], gulp.series('less'))
}
