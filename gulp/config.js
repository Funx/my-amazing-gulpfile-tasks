import R from 'ramda'

let prefixes = {
  source: `src/`
  ,development: `dev/`
  ,production : `prod/`
}

let backend = {
  src: [
    `backend/**/*`
  ]
  ,base: `backend/`
  ,dest: ``
}

let statics = {
  src: [
    `frontend/**/*.php`
    ,`frontend/*.html`
  ]
  ,base: `frontend/`
  ,dest: `application/views/`
}

let images = {
  src: [
    `frontend/images/**/*.{png,jpg,svg,webp}`
  ]
  ,dest: `assets/`
}

let icons = {
  src: [
    `frontend/components/icon/*.svg`
  ]
  ,dest: `assets/`
  ,name: `icons`
  ,template: {
    src: `frontend/components/icon/_template.scss`
    ,dest: `../../${prefixes.source}frontend/components/icon/` // must be relative to the font dest path
  }
}

let fonts = {
  src: [
    `frontend/fonts/*`
  ]
  ,dest: `assets/`
}

let css = {
  src: [
    `frontend/index.scss`
  ]
  ,bundle: [
    prefixes.source + `frontend/`
    ,prefixes.source + `frontend/components/`
    ,`node_modules/`
    ,`node_modules/foundation-sites/scss/`
  ]
  ,dest: `assets/`
}

let templates = {
  src: [
    `frontend/components/**/*.html`
  ]
  ,moduleName: `templates`
  ,dest: `frontend/`
}

let scripts = {
  src: [
    `frontend/index.js`
  ]
  ,bundle: [
    `${prefixes.source}/frontend/**/*.js`
  ]
  ,dest: `assets/`
}

let server = {
  base: ``
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
