import notify from'gulp-notify'

export default function handleError(err) {
  console.log(err.toString())
  notify('Error while parsing scss file. Read console for more.')
  this.emit('end')
}
