import gulp from 'gulp'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglify from 'gulp-uglify'
import persistify from 'persistify'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'
import R from 'ramda'

import config from '../config.js'
let {scripts} = config.paths
let sourceFile = R.compose(
  R.last,
  R.split('/'),
  R.head,
  R.prop('src')
)(scripts)

console.log(scripts.src)

export default function makeScriptsTask({prefix, production, browserSyncInstance}) {
  let bundler

  var b = persistify( {
    debug: true,
    noparse: [
      'jquery',
      'ramda',
    ],
    transform: [
      babelify,
    ],
    paths: [],
  }, { watch: !production } )

  b.add(scripts.src)
  b.on('bundle:done', (time) => console.log('bundle:done', time))
  b.on('error', (err) => console.log('bundle:error', err))

  return () => {
    b.on('update', () => {
      bundle({reload: !production})
    })
    return bundle({reload: false})
  }

  function bundle({reload}) {
    let reloadFn = reload ? browserSyncInstance.reload : () => true
    return b.bundle()
      .on(`error`, (err) => console.log(`Error: ` + err.message))
      .pipe(source(sourceFile))
      .pipe(buffer())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename('bundle.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(prefix + scripts.dest))
      .pipe(browserSyncInstance.stream())
  }
}
