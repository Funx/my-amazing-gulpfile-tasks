import gulp from 'gulp'
import minifyCss from 'gulp-minify-css'
import filter from 'gulp-filter'
import debug from 'gulp-debug'
// import csswring from 'csswring'
// import mqpacker from 'css-mqpacker'
// import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
// import autoprefixer from 'autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'
import cssnext from 'cssnext'
// import precss from 'precss'
// import cssimport from 'postcss-import'
// import inlineComments from 'postcss-inline-comment'
// let scss = require('postcss-scss')
// import cssnext from 'cssnext'

import handleError from '../helpers/handleError.js'
import {paths, prefixes} from '../config.js'
let {css} = paths

export default function makeCSSTask({browserSyncInstance, prefix, production}) {
  let includePaths = css.bundle.map(path => path)

  return () => gulp.src(css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-import'),
      require('postcss-normalize'),
      require('postcss-bem')({
        separators: {
          descendent: '__'
        }
      },
      {from: css.src}),
      require('postcss-mixins'),
      require('cssnext')(),
    ]))
    .on('error', handleError)
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(prefix + css.dest))
    .pipe(filter(['**/*.css']))
    .pipe(browserSyncInstance.stream())
}
