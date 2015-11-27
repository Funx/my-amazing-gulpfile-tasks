import gulp from 'gulp'
import watch from '../watch.js'
import config from '../config.js'
let {prefixes} = config

export default function makeWatchTask({prefix, browserSyncInstance}) {
  return () => {
    gulp.task('reload', function () {
      browserSyncInstance.reload()
      return true
    })

    // create the tasks
    return watch.forEach(({files = [], taskName, reload}) => {
      gulp.watch(files,[ 'watch:' + taskName ])
      gulp.task('watch:' + taskName, [taskName], () => {
        (reload === false) || browserSyncInstance.reload()
        return true;
      })
    })
  }
}
