import fs from 'fs'
import replaceMultiple from './replace-multiple'

export default (file, ...regexAndReplacements) =>
  fs.promises.readFile(file, { encoding: 'utf8' })
    .then(contents => {
      const newContents = replaceMultiple(contents, ...regexAndReplacements)
      if (contents === newContents) {
        return Promise.resolve()
      } else {
        return fs.promises.writeFile(file, newContents)
      }
    })
