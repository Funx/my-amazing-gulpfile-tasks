import gulp from 'gulp'
import watch from '../watch.js'
import makeReloadTask from './reload.js'
import {prefixes, paths} from '../config.js'

export default function makeWatchTask({prefix, browserSyncInstance}) {
  return () => {
    gulp.task('reload', makeReloadTask({browserSyncInstance}))

    let sourceTasks = watch
      .filter(({files}) => (files && files.length))
      .map(({files = [], filesDest = [], taskName, stream}) => {
      // define reload function (noop if stream = true because handled in the task)
      let reload = stream ? () => (console.log('browsSync stream'), true) : browserSyncInstance.reload

      // add prefix to files
      filesDest = filesDest.map((path) => prefix + path)
      console.log(files)
      // create the tasks
      gulp.watch(files.concat(filesDest), ['watch:' + taskName])
      gulp.task('watch:' + taskName, [taskName], () => {
        reload()
        return true;
      })
    })

    let counter = 0;
    let destTasks = watch
      .filter(({files, filesDest}) => (filesDest && filesDest.length && (!files || !files.length)))
      .map(({filesDest}) => {
        gulp.watch(filesDest.concat(filesDest), ['watch-dest:' + counter])
        gulp.task('watch-dest:' + counter, () => {
          browserSyncInstance.reload()
          return true;
        })
        ;++counter
      })

    return true
  }
}
