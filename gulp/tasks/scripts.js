import gulp from 'gulp'
import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import ngAnnotate from 'gulp-ng-annotate'


import {paths} from '../config.js'
let {scripts} = paths
let sourceFile = scripts.src[0].split(`/`)
sourceFile = sourceFile[sourceFile.length - 1]

export default function makeScriptsTask({prefix, production, browserSyncInstance}) {
  let bundler
  function getBundler() {
    if (!bundler) {
      bundler = watchify(browserify(scripts.src, {debug: true}))
    }
    return bundler
  }

  function bundle({reload}) {
    let reloadFn = reload ? browserSyncInstance.stream : () => true
    return getBundler()
      .transform(babelify)
      .bundle()
      .on(`error`, (err) => console.log(`Error: ` + err.message))
      .pipe(source(sourceFile))
      .pipe(buffer())
      .pipe(ngAnnotate())
      .pipe(gulp.dest(prefix + scripts.dest))
      .pipe(reloadFn())
  }

  return () => {
    if (production) {
      return bundle()
    } else {
      getBundler().on('update', () => bundle({reload: true}))
      return bundle({reload: true})
    }
  }
}
