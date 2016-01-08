// dependencies
import gulp from 'gulp'
import browserSync from 'browser-sync'
import runSequence from 'run-sequence'

//config
import config from './config'
let prefixes = config.prefixes
let {images, icons, css, scripts} = config.paths

// task factories
import makeIconsTask from './tasks/icons'
import makeStylesTask from './tasks/styles'
import makeImagesTask from './tasks/images'
import makeScriptsTask from './tasks/scripts'

import makeServerTask from './tasks/server'
import makeWatchTask from './tasks/watch'

function runMainTask(context) {

  gulp.task('icons', makeIconsTask(context))
  gulp.task('styles', ['icons'], makeStylesTask(context))
  gulp.task('images', ['styles'], makeImagesTask(context))
  gulp.task('scripts', makeScriptsTask(context))

  gulp.task('build', (end) => runSequence(
    [
      'styles',
      'scripts',
      'images',
      'icons',
    ],
    end)
  )
  gulp.task('server', ['build'], makeServerTask(context))
  gulp.task('watch', ['server'], makeWatchTask(context))

  if (context.production) {
    return gulp.start('watch')
  } else {
    console.log('start watch task')
    return gulp.start('watch')
  }
}

// default
gulp.task('default', () => {
  let context = {
    browserSyncInstance: browserSync.create('development server'),
    prefix: prefixes.development,
    production: false,
  }
  runMainTask(context)
})

// production
gulp.task('production', () => {
  let context = {
    prefix: prefixes.production,
    production: true,
  }
  runMainTask(context)
})
