import gulp from 'gulp'
import R from 'ramda'
import {flatten} from 'ramda'
import debug from 'gulp-debug'
import changed from 'gulp-changed'
import responsive from 'gulp-responsive'
import responsiveConfig from 'gulp-responsive-config'
import rename from 'gulp-rename'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import glob from 'glob'

import config from '../config.js'
let {prefixes} = config
let {images, css} = config.paths

export default function makeImagesTask({prefix}) {
  let retinasImages = []

  return () => {
    let oldRetinasImages = R.map(R.prop('rename'), retinasImages)
    let imageFiles = R.compose(
      R.flatten,
      R.map(glob.sync),
      R.prop('src')
    )(images)

    retinasImages = getResponsiveImagesConfig()
    let newRetinasImages = R.compose(
      R.concat(imageFiles),
      R.map(R.prop('rename'))
    )(retinasImages)

    let difference = R.difference(newRetinasImages, oldRetinasImages)

    if (!difference.length) return;

    return R.compose(
      processImages,
      R.filter((image) => difference.indexOf(image.rename) > -1)
    )(retinasImages)
  }

  function getResponsiveImagesConfig() {
    let cssName = R.last(
        css.src[0].split(`/`)
      )
      .replace(`scss`, `css`)
    let cssPath = prefix + css.dest + cssName

    return R.compose(
      R.uniqBy(R.prop('rename')),
      R.map((image) => {
        image.name = R.last(image.name.split(`/`))
        image.rename = R.last(image.rename.split(`/`))
        if (typeof image.height === `undefined`) delete image.height
        if (typeof image.width === `undefined`) delete image.width
      }),
      R.filter(R.or(
        R.prop('height'),
        R.prop('width')
      )),
      responsiveConfig
    )(cssPath)
  }

  function processImages (configFile) {
    let options = {
      passThroughUnused: true,
      errorOnUnusedImage: false,
      errorOnUnusedConfig: false,
      quality: 100,
    }

    return gulp.src(images.src)
      .pipe(changed(prefix + images.dest))
      .pipe(responsive(configFile, options))
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false,
        }],
        use: [pngquant()],
      }))
      .pipe(gulp.dest(prefix + images.dest))
  }
}
