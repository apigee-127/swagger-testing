/// <reference path="./typings/node/node.d.ts"/>
/// <reference path="./typings/gulp/gulp.d.ts"/>

var gulp = require('gulp');
var tsc = require('gulp-tsc');
var mocha = require('gulp-mocha');
var typescriptCompilerOptions = require('./tsconfig.json').compilerOptions;

gulp.task('test', ['default', 'copy'], function() {
  return gulp.src('build/test/index.js', {read: false})
    .pipe(mocha());
});

gulp.task('copy', function() {
  return gulp.src(['test/swaggers/*.json'])
    .pipe(gulp.dest('build/test/swaggers'));
});

gulp.task('default', function() {
  return gulp.src([
      'src/**/*.ts',
      'test/**/*.ts'
    ])
    .pipe(tsc(typescriptCompilerOptions))
    .pipe(gulp.dest('build/'));
});
