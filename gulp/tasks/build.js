import runSequence from 'run-sequence'

export default function makeBuildTask(context) {
  return (next) => {
    return runSequence(`templates`, next)
    // return next()
  }
}
