import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import cache from 'gulp-cached'

export function build (breakOnError = true) {
  const src = [
    `lib/**/*.js`,
    `!**/node_modules/**/*`
  ]
  function _build () {
    const b = babel({
      presets: [ 'env' ]
    })
    if (!breakOnError) b.on('error', function () { b.end() })
    return gulp
      .src(src)
      .pipe(cache(`build-lib`))
      .pipe(sourcemaps.init())
      .pipe(b)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(`dist`))
  }
  _build.displayName = `build-lib`
  return _build
}

gulp.task('build', build())
