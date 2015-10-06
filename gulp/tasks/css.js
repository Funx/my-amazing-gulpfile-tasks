import gulp from 'gulp'
import minifyCss from 'gulp-minify-css'
// import csswring from 'csswring'
// import mqpacker from 'css-mqpacker'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
// import autoprefixer from 'autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
// import postcss from 'gulp-postcss'
import cssnext from 'gulp-cssnext'
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
    .pipe(sass({
      includePaths: includePaths,
      outputStyle: (production ? `compressed` : `nested`),
      errLogToConsole: true
    }))
    .pipe(cssnext())
    .on('error', handleError)
    .pipe(minifyCss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(prefix + css.dest))
    .pipe(browserSyncInstance.stream());
}
