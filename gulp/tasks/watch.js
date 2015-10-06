import gulp from 'gulp'
import watch from '../watch.js'
import {prefixes, paths} from '../config.js'

export default function makeWatchTask({prefix, browserSyncInstance}) {
  return () => {
    browserSyncInstance.reload()
    return watch.forEach(({files = [], filesDest = [], taskName, stream}) => {
      // define reload function (noop if stream = true because handled in the task)
      let reload = stream ? () => true :  browserSyncInstance.reload

      // add prefix to files
      filesDest = filesDest.map((path) => prefix + path)

      // create the tasks
      gulp.watch(files.concat(filesDest), ['watch:' + taskName])
      gulp.task('watch:' + taskName, [taskName], () => {
        reload()
        return true;
      })
    })
  }
}
