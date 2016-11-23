/**
 *
 */

require('es6-promise').polyfill();
// var gulp = require('gulp');
// var $ = require('gulp-load-plugins')();

// gulp.task('css', function() {
//   return gulp.src('app/styles/main.scss')
//            .pipe($.sourcemaps.init())
//            .pipe($.sass().on('error', $.sass.logError))
//            .pipe($.autoprefixer({
//              browsers: ['last 2 versions'],
//              cascade: false
//            }))
//            .pipe($.sourcemaps.write())
//            .pipe(gulp.dest('./dist'));
// })

// gulp.task('css:watch', function() {
//   gulp.watch('app/styles/**/*.scss', ['css']);
// });

// gulp.task('css:build', ['css'], function() {
//   return gulp.src('./dist/main.css')
//              .pipe($.rev())
//              .pipe(gulp.dest('./dist'))
//              .pipe($.rev.manifest())
//              .pipe(gulp.dest('./dist'));
// })


/**
 *
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ camelize: true });
var runSequence = require('run-sequence');
var path = require('path');

gulp.task('css', function() {
  var moduleImporter = require('sass-module-importer');

  return gulp.src('app/styles/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      importer: moduleImporter({
        basedir: path.join(__dirname, './node_modules/')
      }),
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('css:watch', ['css'], function() {
  gulp.watch('app/styles/**/*.scss', ['css']);
});

gulp.task('moveAssets', function() {
  return gulp.src('./app/assets/**/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:revAssets', ['css', 'moveAssets'], function() {
  var rev = new $.revAll();
  return gulp.src('./dist/**/*')
    .pipe(rev.revision())
    .pipe(gulp.dest('./dist/public'))
    .pipe(rev.manifestFile())
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:cpServer', function() {
  return gulp.src('./app/**/*.{js,ejs}')
    .pipe(gulp.dest('./dist/server-build'));
});

gulp.task('build:revServer', ['build:cpServer'], function() {
  var manifest = gulp.src('./dist/rev-manifest.json');
  return gulp.src('./dist/server-build/{components,containers}/**/*')
    .pipe($.revReplace({ manifest: manifest }))
    .pipe(gulp.dest('./dist/server-build'));
});

gulp.task('build', function() {
  // runSequence('build:revAssets', 'build:revServer');
  runSequence('css', 'moveAssets');
});
