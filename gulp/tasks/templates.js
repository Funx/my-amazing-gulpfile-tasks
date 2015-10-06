import gulp from 'gulp'
import ngHtml2js from 'gulp-ng-html2js'
import minifyHtml from 'gulp-minify-html'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import debug from 'gulp-debug'
import {prefixes, paths} from '../config.js'
let {templates} = paths
let strippedPrefix = templates.src[0].split(`*`)[0]

export default function makeTemplatesTask({prefix}) {

  return () => gulp.src(templates.src)
    .pipe(debug())
    .pipe(minifyHtml({
      empty: true
      ,spare: true
      ,quotes: true
    }))
    .pipe(ngHtml2js({
      stripPrefix: strippedPrefix
      ,moduleName: templates.moduleName
    }))
    .pipe(concat(templates.moduleName + '.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(prefixes.source + templates.dest))
    .pipe(debug())
}
