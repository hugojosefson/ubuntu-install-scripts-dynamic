'use strict';

var expect = require('chai').expect;

var command = require('../../install-scripts/disable-unity-shopping-scopes/command');
var scopes = ['scope1', 'scope2'];
var expected = 'gsettings set com.canonical.Unity.Lenses disabled-scopes \'["scope1","scope2"]\'';

describe('disable-unity-shopping-scopes', function () {
    describe('.command', function () {
        it('should be correct', () => {
            expect(command(scopes)).to.equal(expected);
        });
    });
});
