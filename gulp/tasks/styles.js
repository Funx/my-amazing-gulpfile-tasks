import gulp from 'gulp'
import minifyCss from 'gulp-minify-css'
import filter from 'gulp-filter'
import debug from 'gulp-debug'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'

import handleError from '../helpers/handleError.js'
import config from '../config.js'
let {prefixes} = config
let {css} = config.paths

export default function makeCSSTask({browserSyncInstance, prefix, production}) {
  let includePaths = css.bundle.map(path => path)

  return () => gulp.src(css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-normalize'),
      require('postcss-mixins'),
      require('cssnext')(),
    ]))
    .on('error', handleError)
    .pipe(minifyCss())
    .pipe(rename('bundle.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(prefix + css.dest))
    .pipe(filter(['**/*.css']))
    .pipe(browserSyncInstance.stream())
}
