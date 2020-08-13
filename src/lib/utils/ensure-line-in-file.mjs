import _ from 'lodash'

import fs from 'fs'
import ensureEndsWith from './ensure-ends-with.mjs'

const lineWithCorrectNewLines = (line, contents) => {
  const lineWithNewLineEnd = ensureEndsWith(line, '\n')
  if (!contents || contents.endsWith('\n')) {
    return lineWithNewLineEnd
  } else {
    return '\n' + lineWithNewLineEnd
  }
}

export default (file, line) =>
  fs.promises.readFile(file, 'utf8').then(contents => {
    if (_.find(contents.split('\n'), currentLine => currentLine === line)) {
      return true
    } else {
      return fs.promises.appendFile(file, lineWithCorrectNewLines(line))
    }
  })
