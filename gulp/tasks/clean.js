import gulp from 'gulp'
import del from 'del'

import {paths, prefixes} from '../config.js'
let {backend, statics} = paths


function makeCleanTask({prefix}) {
  return () => del([prefix + '**/*', '!' + prefix + 'uploads/**/*'])
}

export default makeCleanTask
