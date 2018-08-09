import gulp from 'gulp'
import { build } from './build'
import { unit, lint } from './test'

const tasks = gulp.series(
  build(false),
  unit(false),
  lint(false))

export function watch (done) {
  let src = [
    'lib/**/*',
    'test/**/*',
    'gulpfile.js/**/*',
    '!**/node_modules/**',
    '!**/build/**'
  ]
  gulp.watch(src, tasks)
  done()
}

gulp.task('watch', gulp.series(tasks, watch))
