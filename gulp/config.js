import R from 'ramda'

let prefixes = {
  source: `themes/zygmund2016/assets/`,
  development: `themes/zygmund2016/assets/`,
  production : `themes/zygmund2016/assets/`,
}

let images = {
  src: [
    `_images/**/*.{png,jpg,svg,webp}`,
  ],
  dest: `images/`,
}

let icons = {
  src: [
    `_icons/*.svg`,
  ],
  dest: `fonts/`,
  name: `icons`,
  template: {
    src: `_icons/template.css`,
    dest: `../_css/`, // must be relative to the font dest path
  },
}

let css = {
  src: [
    `_css/index.css`,
  ],
  bundle: [
    `${prefixes.source}_css/**/*.css`,
  ],
  dest: `/`,
}

let scripts = {
  src: [
    `_javascript/index.js`,
  ],
  bundle: [
    `${prefixes.source}_javascript/**/*.js`,
  ],
  dest: `/`,
}

let server = {
  base: `./`,
  hostname: `0.0.0.0`,
  port: 8000,
}

// group as object and add prefix 'source' to each src
let paths = R.mapObj(
  (obj) => {
    obj.src = obj.src.map(
      (path) => prefixes.source + path
    )
    return obj
  },
  {images, icons, css, scripts}
)
export default {prefixes, paths, server}
