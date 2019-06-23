/* eslint-env mocha */
import chai from 'chai'
import command from '../../install-scripts/disable-unity-shopping-scopes/command'

const { expect } = chai
const scopes = ['scope1', 'scope2']
const expected = 'gsettings set com.canonical.Unity.Lenses disabled-scopes \'["scope1","scope2"]\''

describe('disable-unity-shopping-scopes', function () {
  describe('.command', function () {
    it('should be correct', () => {
      expect(command(scopes)).to.equal(expected)
    })
  })
})
