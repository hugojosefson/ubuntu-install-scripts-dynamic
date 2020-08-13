/* eslint-env mocha */
import chai from 'chai'
import scriptName from '../../src/lib/utils/script-name.mjs'

const { expect } = chai

describe('script-name', function () {
  ;[
    ['file:///asd/asd/qwe.js', 'qwe'],
    ['file:///asd/asd/qwe.mjs', 'qwe'],
    ['file:///asd/asd/qwe.es6', 'qwe'],
    ['file:///asd/asd/.js', '.js'],
    ['file:///asd/asd/.mjs', '.mjs'],
    ['file:///asd/asd/qwe', 'qwe'],
    ['file:///asd/asd/qwe/index.js', 'qwe'],
    ['file:///asd/asd/qwe/index.mjs', 'qwe'],
    ['file:///asd/asd/qwe/index/index.js', 'index'],
    ['file:///asd/asd/qwe/index/index.mjs', 'index'],
  ].forEach(([scriptUrl, expected]) => {
    it(scriptUrl + ' => ' + expected, () => {
      expect(scriptName(scriptUrl)).to.equal(expected)
    })
  })
})
