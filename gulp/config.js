import R from 'ramda'

let prefixes = {
  source: `cms/themes/love_and_zucchini/source/`,
  development: `cms/themes/love_and_zucchini/assets/`,
  production : `cms/themes/love_and_zucchini/assets/`,
}

let backend = {
  src: []
  ,base: ``
  ,dest: ``
}

let statics = {
  src: []
  ,base: ``
  ,dest: ``
}

let images = {
  src: [
    `images/**/*.{png,jpg,svg,webp}`
  ]
  ,dest: `images/`
}

let icons = {
  src: [
    `icons/*.svg`
  ]
  ,dest: `fonts/`
  ,name: `icons`
  ,template: {
    src: `icons/template.css`
    ,dest: `../../source/css/` // must be relative to the font dest path
  }
}

let fonts = {
  src: [],
  dest: ``,
}

let css = {
  src: [
    `css/index.css`,
  ],
  bundle: [
    `${prefixes.source}css/**/*.css`,
  ],
  dest: `/`,
}

let templates = {
  src: []
  ,moduleName: `templates`
  ,dest: ``
}

let scripts = {
  src: [
    `javascript/index.js`
  ]
  ,bundle: [
    `${prefixes.source}javascript/**/*.js`
  ]
  ,dest: `/`
}

let server = {
  base: `../../`
  ,hostname: `0.0.0.0`
  ,port: 8000
}

let addSourcePrefix = R.mapObj((obj) => {
  obj.src = obj.src.map((path) => prefixes.source + path)
  return obj
})

let paths = {backend, statics, images, icons, fonts, css, templates, scripts}
paths = addSourcePrefix(paths)
let config = {prefixes, paths, server}
export default config
