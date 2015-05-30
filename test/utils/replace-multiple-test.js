'use strict';

var expect = require('chai').expect;

var replaceMultiple = require('../../lib/utils/replace-multiple');

describe('replace-multiple', function () {
    it('replace-multiple("hugo", []) => "hugo"', () => {
        expect(replaceMultiple('hugo', [])).to.equal('hugo');
    });
    it('replace-multiple("hugo", [/go/, "eg"]) => "hueg"', () => {
        expect(replaceMultiple('hugo', [/go/, 'eg'])).to.equal('hueg');
    });
    it('replace-multiple("hugo", [/go/, "eg"], [/ue/, "UE"]) => "hUEg"', () => {
        expect(replaceMultiple('hugo', [/go/, 'eg'], [/ue/, 'UE'])).to.equal('hUEg');
    });
});
