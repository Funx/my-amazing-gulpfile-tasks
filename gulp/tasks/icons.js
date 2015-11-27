import gulp from 'gulp'
import iconfont from 'gulp-iconfont'
import iconfontCss from 'gulp-iconfont-css'
import rename from 'gulp-rename'

import config from '../config.js'
let {prefixes} = config
let {icons} = config.paths

export default function makeIconsTask({prefix}) {
  return (next) => gulp.src(icons.src)
    .pipe(rename((path) => {
      path.basename = path.basename
        .replace(icons.name + `_`, ``) // because of illustrator export syle
        .replace(`%`, `-percent`) // prevents bugs in the css
    }))
    .pipe(iconfontCss({
      fontName: icons.name
      ,path: prefixes.source + icons.template.src // path to source template
      ,targetPath: icons.template.dest + '_index.scss' // relative to the font dest path
      ,fontPath: `./` // relative to final css destination path
    }))
    .pipe(iconfont({
      fontName: icons.name
      ,normalize: true
    }))
    .pipe(gulp.dest(prefix + icons.dest))
}
