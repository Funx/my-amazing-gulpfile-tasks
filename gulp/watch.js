import R from 'ramda'
import config from './config.js'
let prefixes = config.prefixes
let { images, icons, css, scripts } = config.paths

let watchConfig = [
  {
    taskName: `icons`,
    files: R.flatten([
      icons.src,
      icons.template.src,
    ]),
  },
  { // not sure if usefull because handled by browserify
    taskName: `scripts`,
    files: R.flatten([
      scripts.src,
      scripts.bundle,
    ]),
    reload: false,
  },
  {
    taskName: `images`,
    files: R.flatten([
      images.src,
      css.dest + 'bundle.css',
    ]),
    reload: false,
  },
  {
    taskName: `reload`,
    files: [
      './themes/**/*.htm',
      './plugins/**/*.htm',
      'images.dest', // auto reload is desactivated in images task
    ],
  },
  {
    taskName: `styles`,
    files: R.flatten([
      css.src,
      css.bundle,
      icons.template.dest.replace(/(\.\.\/)/g, ''),
      prefixes.source + icons.template.src,
    ]),
    reload: false,
  }
]

export default watchConfig
