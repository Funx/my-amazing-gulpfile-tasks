import gulp from 'gulp'
import changed from 'gulp-changed'

import {paths, prefixes} from '../config.js'
let {backend, statics} = paths


function makeCopyBackendTask({prefix}) {
  return () =>
    gulp.src(backend.src, {
      base: prefixes.source + backend.base
    })
    .pipe(changed(prefix + backend.dest))
    .pipe(gulp.dest(prefix + backend.dest))
}

function makeCopyStaticsTask({prefix}) {
  return () => (
      gulp
        .src(statics.src, { base: prefixes.source + statics.base})
        .pipe(gulp.dest(prefix + statics.dest))
    )
}

export default {makeCopyStaticsTask, makeCopyBackendTask}
