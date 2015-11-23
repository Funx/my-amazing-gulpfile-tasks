import R from 'ramda'
import {prefixes, paths} from './config.js'
let {backend, statics, fonts, images, icons, css, templates, scripts} = paths
let cssName = R.last(css.src[0].split(`/`)).replace(`scss`, `css`)
let cssPath = css.dest + cssName

let watchConfig = [
  {
    taskName: `copy`
    ,files: statics.src.concat(backend.src, fonts.src)
  }
  // ,{
  //   taskName: `phpunit`
  //   ,files: backend.src
  // }
  ,{
    taskName: `icons`
    ,files: icons.src.concat(icons.template.src)
  }
  // usually handled by browserify
  ,{
    taskName: `scripts`
    ,files: scripts.src.concat(scripts.bundle)
    // ,stream: true
  }
  ,{
    taskName: `images`
    ,files: images.src.concat()
    ,stream: true // stop reloading all the fucking time !
    ,filesDest: [cssPath] // watch these files too
  },
  {
    taskName: `reload`,
    files: [
      './cms/**/*.htm',
    ],
    filesDest: [images.dest], // watch these files too
  },
  // {
  //   taskName: `templates`,
  //   files: templates.src,
  // },
  {
    taskName: `css`
    ,files: css.bundle
      .concat([
        '!' + icons.template.dest.replace(/(\.\.\/)/g, '')
      ])
      .concat(css.src)
      .concat([prefixes.source + icons.template.src])

    ,stream: true
  }
]

export default watchConfig
