/* eslint-env mocha */
import chai from 'chai'
import scriptName from '../../src/lib/utils/script-name.mjs'

const { expect } = chai

describe('script-name', function () {
  ;[
    ['file:///asd/asd/install-scripts/qwe.js', 'qwe'],
    ['file:///asd/asd/install-scripts/qwe.mjs', 'qwe'],
    ['file:///asd/asd/install-scripts/qwe.es6', 'qwe'],
    ['file:///asd/asd/install-scripts/.js', '.js'],
    ['file:///asd/asd/install-scripts/.mjs', '.mjs'],
    ['file:///asd/asd/install-scripts/qwe', 'qwe'],
    ['file:///asd/asd/install-scripts/qwe/index.js', 'qwe'],
    ['file:///asd/asd/install-scripts/qwe/index.mjs', 'qwe'],
    ['file:///asd/asd/qwe/install-scripts/index/index.js', 'index'],
    ['file:///asd/asd/qwe/install-scripts/index/index.mjs', 'index'],
    // sys
    ['file:///asd/asd/install-scripts/sys/qwe.js', 'sys/qwe'],
    ['file:///asd/asd/install-scripts/sys/qwe.mjs', 'sys/qwe'],
    ['file:///asd/asd/install-scripts/sys/qwe.es6', 'sys/qwe'],
    ['file:///asd/asd/install-scripts/sys/.js', 'sys/.js'],
    ['file:///asd/asd/install-scripts/sys/.mjs', 'sys/.mjs'],
    ['file:///asd/asd/install-scripts/sys/qwe', 'sys/qwe'],
    ['file:///asd/asd/install-scripts/sys/qwe/index.js', 'sys/qwe'],
    ['file:///asd/asd/install-scripts/sys/qwe/index.mjs', 'sys/qwe'],
    ['file:///asd/asd/qwe/install-scripts/sys/index/index.js', 'sys/index'],
    ['file:///asd/asd/qwe/install-scripts/sys/index/index.mjs', 'sys/index'],
    // user
    ['file:///asd/asd/install-scripts/user/qwe.js', 'user/qwe'],
    ['file:///asd/asd/install-scripts/user/qwe.mjs', 'user/qwe'],
    ['file:///asd/asd/install-scripts/user/qwe.es6', 'user/qwe'],
    ['file:///asd/asd/install-scripts/user/.js', 'user/.js'],
    ['file:///asd/asd/install-scripts/user/.mjs', 'user/.mjs'],
    ['file:///asd/asd/install-scripts/user/qwe', 'user/qwe'],
    ['file:///asd/asd/install-scripts/user/qwe/index.js', 'user/qwe'],
    ['file:///asd/asd/install-scripts/user/qwe/index.mjs', 'user/qwe'],
    ['file:///asd/asd/qwe/install-scripts/user/index/index.js', 'user/index'],
    ['file:///asd/asd/qwe/install-scripts/user/index/index.mjs', 'user/index'],
  ].forEach(([scriptUrl, expected]) => {
    it(scriptUrl + ' => ' + expected, () => {
      expect(scriptName(scriptUrl)).to.equal(expected)
    })
  })
})
