import gulp from 'gulp'
import standard from 'gulp-standard'
import mocha from 'gulp-mocha'
import { build } from './build'

export function unit (breakOnError = true) {
  function fn () {
    const m = mocha({
      require: ['source-map-support/register'],
      reporter: 'spec',
      timeout: -1
    })
    if (!breakOnError) m.on('error', function () { m.end() })

    return gulp
      .src('dist/**/*.spec.js', { read: false })
      .pipe(m)
  }

  fn.displayName = 'unit-test'
  return fn
}

export function lint (breakOnError = true) {
  function fn () {
    const src = [
      'lib/**/*.js',
      'test/**/*.js',
      'gulpfile.js/**/*.js',
      '!**/node_modules/**',
      '!**/dist/**'
    ]
    return gulp
      .src(src)
      .pipe(standard())
      .pipe(standard.reporter('default', {
        breakOnError,
        quiet: true
      }))
  }

  fn.displayName = `lint`
  return fn
}

gulp.task('test', gulp.series(build(), unit(), lint()))
gulp.task('lint', lint())
