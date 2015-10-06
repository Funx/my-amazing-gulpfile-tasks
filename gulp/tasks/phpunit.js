import gulp from 'gulp'
import notify from'gulp-notify'
import phpunit from '../modules/gulp-phpunit'
import debug from 'gulp-debug'
import R from 'ramda'

import {paths, prefixes} from '../config.js'
let {backend} = paths

export default function makePhpUnitTask (context) {
  return () => gulp.src('phpunit.xml')
    .pipe(phpunit('./' + prefixes.source + backend.base + 'vendor/bin/phpunit', {
      notify: true
    , debug: false
    , colors: false
    }))
    .on('error', () => (console.log("eroooorrrr"), notify(testNotification('fail', 'phpunit'))))
    // .pipe(notify(testNotification('pass', 'phpunit')))
  // return () => gulp.src(prefixes.source + backend.base + 'phpunit.xml')
  //   .pipe(debug({title: 'phpunit file :'}))
  //   .pipe(phpunit(prefixes.source + backend.base + 'vendor/bin/phpunit', {notify: true, debug: true}))
  //   .on('error', notify.onError(testNotification('fail', 'phpunit')))
  //   .pipe(notify(testNotification('pass', 'phpunit')))
}

function testNotification(status, pluginName, override) {
  let options = {
    title:   ( status == 'pass' ) ? 'Tests Passed' : 'Tests Failed',
    message: ( status == 'pass' ) ? '\n\nAll tests have passed!\n\n' : '\n\nOne or more tests failed...\n\n',
    icon:    __dirname + '/node_modules/gulp-' + pluginName +'/assets/test-' + status + '.png'
  }
  options = R.merge(options, override)
  return options;
}
