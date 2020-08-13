/* eslint-env mocha */
import chai from 'chai'
import scriptName from '../../src/lib/utils/script-name.mjs'

const { expect } = chai

describe('script-name', function () {
  ;[
    ['/asd/asd/qwe.js', 'qwe'],
    ['/asd/asd/qwe.mjs', 'qwe'],
    ['/asd/asd/qwe.es6', 'qwe'],
    ['/asd/asd/.js', '.js'],
    ['/asd/asd/.mjs', '.mjs'],
    ['/asd/asd/qwe', 'qwe'],
    ['/asd/asd/qwe/index.js', 'qwe'],
    ['/asd/asd/qwe/index.mjs', 'qwe'],
    ['/asd/asd/qwe/index/index.js', 'index'],
    ['/asd/asd/qwe/index/index.mjs', 'index'],
  ].forEach(([filename, expected]) => {
    it(filename + ' => ' + expected, () => {
      expect(scriptName(filename)).to.equal(expected)
    })
  })
})
