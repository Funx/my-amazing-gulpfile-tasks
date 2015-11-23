import php from 'gulp-connect-php'
import {server as serverConfig, prefixes} from '../config.js'
let {hostname, port, base} = serverConfig

export default function makeServerTask({prefix, browserSyncInstance}) {
  return () => {
    php.server({
      hostname,port
      ,base: `./cms`
      // ,base: `./` + prefix + base
    }, () => {
      browserSyncInstance.init({
        proxy: `http://${hostname}:${port}`,
        notify: false,
        open: false
      })
    })
  }
}
