'use strict';

var expect = require('chai').expect;

var ensure = require('../../lib/utils/ensure-ends-with');

describe('ensure-ends-with', function () {
    it('ensure-ends-with("hugo", "go") => "hugo"', () => {
        expect(ensure('hugo', 'go')).to.equal('hugo');
    });
    it('ensure-ends-with("hugo\\n", "go") => "hugo\\ngo"', () => {
        expect(ensure('hugo\n', 'go')).to.equal('hugo\ngo');
    });
    it('ensure-ends-with("hugo\\n", "\\n") => "hugo\\n"', () => {
        expect(ensure('hugo\n', '\n')).to.equal('hugo\n');
    });
});
