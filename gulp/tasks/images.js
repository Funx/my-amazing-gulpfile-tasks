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

import {prefixes, paths} from '../config.js'
let {images, css} = paths
let retinasImages = []

export default function makeImagesTask({prefix}) {
  function getResponsiveImagesConfig() {
    let cssName = R.last(
        css.src[0].split(`/`)
      )
      .replace(`scss`, `css`)
    let cssPath = prefix + css.dest + cssName

    let responsiveImages = responsiveConfig(cssPath)
      .map((image) => {
        image.name = R.last(image.name.split(`/`))
        image.rename = R.last(image.rename.split(`/`))

        if (typeof image.height === `undefined`) {
          delete image.height
        }
        if (typeof image.width === `undefined`) {
          delete image.width
        }
        let isValid = image.height || image.width
        return isValid ? image : undefined
      })
      .filter((value) => !!value)

    return R.uniqBy((image) => image.rename, responsiveImages)
  }

  function processImages (configFile) {
    let options = {
      passThroughUnused: true
      ,errorOnUnusedImage: false
      ,errorOnUnusedConfig: false
      ,quality: 100
    }

    return gulp.src(images.src)
      .pipe(debug({
        title: `src:`
      }))
      .pipe(changed(prefix + images.dest))
      .pipe(responsive(configFile, options))
      .pipe(imagemin({
        progressive: true
        ,svgoPlugins: [{
          removeViewBox: false
        }]
        ,use: [pngquant()]
      }))
      .pipe(gulp.dest(prefix + images.dest))
  }

  return () => {
    let imageFiles = flatten(images.src.map((path) => glob.sync(path)))
    let oldRetinasImages = retinasImages.map((image) => image.rename)
    retinasImages = getResponsiveImagesConfig()
    let newRetinasImages = retinasImages.map((image) => image.rename).concat(imageFiles)

    let difference = R.difference(newRetinasImages, oldRetinasImages)

    if (difference.length) {
      let imagesToProcess = retinasImages
        .filter((image) => difference.indexOf(image.rename) > -1) // should process ?
      return processImages(imagesToProcess);
    } else {
      return;
    }
  }
}
