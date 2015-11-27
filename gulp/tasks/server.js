import php from 'gulp-connect-php'
import config from '../config.js'
let { prefixes } = config
let { hostname, port, base } = config.server

export default function makeServerTask({ prefix, browserSyncInstance }) {
  return () => {
    php.server({
      hostname,
      port,
    }, () => {
      browserSyncInstance.init({
        proxy: `http://${hostname}:${port}`,
        notify: false,
        open: false,
      })
    })
  }
}
