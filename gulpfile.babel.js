// dependencies
import gulp from 'gulp'
import browserSync from 'browser-sync'
import runSequence from 'run-sequence'

//config
import {paths, prefixes} from './gulp/config.js'
let {backend, statics, images, icons, fonts, css, templates, scripts} = paths

// task factories
import makePhpUnitTask from './gulp/tasks/phpunit.js'

import makeCleanTask from './gulp/tasks/clean.js'
import {makeCopyBackendTask, makeCopyStaticsTask} from './gulp/tasks/copy.js'
import makeTemplatesTask from './gulp/tasks/templates.js'
import makeIconsTask from './gulp/tasks/icons.js'
import makeCSSTask from './gulp/tasks/css.js'
import makeImagesTask from './gulp/tasks/images.js'
import makeScriptsTask from './gulp/tasks/scripts.js'

import makeBuildTask from './gulp/tasks/build.js'
import makeServerTask from './gulp/tasks/server.js'
import makeWatchTask from './gulp/tasks/watch.js'

function runMainTask(context) {

  gulp.task('clean', makeCleanTask(context))

  gulp.task('phpunit', makePhpUnitTask(context)) // bordel de chiotte je suis nul en php
  gulp.task('copy:backend', makeCopyBackendTask(context))
  gulp.task('copy:statics', ['copy:backend'], makeCopyStaticsTask(context))
  gulp.task('copy', ['copy:backend', 'copy:statics'])

  gulp.task('templates', makeTemplatesTask(context))
  gulp.task('icons', makeIconsTask(context))
  gulp.task('css', ['icons'], makeCSSTask(context))
  gulp.task('images', ['css'], makeImagesTask(context))
  gulp.task('scripts', makeScriptsTask(context))

  gulp.task('build', (end) => runSequence(
    [
      'clean'
    , 'templates'
    ]
    ,[
      'copy'
      ,'css'
      ,'scripts'
      ,'images'
      ,'icons'
      ,'phpunit'
    ]
    ,end)
  )
  gulp.task('server', ['build'], makeServerTask(context))
  gulp.task('watch', ['server'], makeWatchTask(context))

  if (context.production) {
    return gulp.start('build')
  } else {
    return gulp.start('watch')
  }
}

// default
gulp.task('default', () => {
  let context = {
    browserSyncInstance: browserSync.create('development server')
    ,prefix: prefixes.development
    ,production: false
  }
  runMainTask(context)
})

// default
gulp.task('production', () => {
  let context = {
    prefix: prefixes.production
    ,production: true
  }
  runMainTask(context)
})
