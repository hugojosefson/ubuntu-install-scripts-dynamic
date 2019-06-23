import path from 'path'

const naiiveScriptName = filename => path.basename(
  filename,
  path.extname(filename)
)

export default filename => {
  const name = naiiveScriptName(filename)
  if (name === 'index') {
    return path.basename(path.dirname(filename))
  } else {
    return name
  }
}
