/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/gulp/gulp.d.ts"/>

var gulp = require('gulp');
var tsc = require('gulp-tsc');
var mocha = require('mocha');

gulp.task('test', ['default'], function() {
  gulp.src('build/test/index.js')
    .pipe(mocha());
});

gulp.task('default', function() {
  return gulp.src([
      'src/**/*.ts'
    ])
    .pipe(tsc())
    .pipe(gulp.dest('build'));
});
