import path from 'path'

const naïveScriptName = filename =>
  path.basename(filename, path.extname(filename))

export default filename => {
  const name = naïveScriptName(filename)
  if (name === 'index') {
    return path.basename(path.dirname(filename))
  } else {
    return name
  }
}
