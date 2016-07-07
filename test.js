var emailExistence = require('./index');
var expect = require('expect.js');

describe('emailExistence', function() {
    it('is backwards compatible', function() {
        expect(emailExistence.check).to.a('function');
    });

    it('returns false instantly for invalid emails', function(done) {
        emailExistence('a@', function(err, valid) {
            expect(valid).to.be(false);
            done();
        });
    });

    it('allows strange formats but that are technically valid', function(done) {
        var ok;

        emailExistence('a+b@b.co', function(err, valid) {
            if (!ok) {
                throw new Error('should not return immediately');
            }
        });

        ok = true;
        done();
    });

    it('recognizes andreas', function(done) {
        this.timeout(30e3);
        emailExistence('andreas.brekken@gmail.com', function(err, valid) {
            expect(err).to.match(null);
            expect(valid).to.be(true);
            done();
        });
    });

    it('recognizes gmail+', function(done) {
        this.timeout(30e3);
        emailExistence('andreas.brekken+spam@gmail.com', function(err, valid) {
            expect(err).to.match(null);
            expect(valid).to.be(true);
            done();
        });
    });

    it('fails on unrecognized domain', function(done) {
        this.timeout(30e3);
        emailExistence('x@doesnotexist', function(err, valid) {
            expect(valid).to.be(false);
            // expect(err.message).to.match(/ENOTFOUND/);
            done();
        });
    });

    it('fails on unrecognized domain', function(done) {
        this.timeout(30e3);
        emailExistence('x@doesnotexistvft678ijhgfrt6.com', function(err, valid) {
            expect(valid).to.be(false);
            // expect(err.message).to.match(/ENOTFOUND/);
            done();
        });
    });

    it('fails on non-existent address', function(done) {
        this.timeout(30e3);
        emailExistence('x@gmail.com', function(err, valid) {
            // expect(err).to.match(/^550/);
            expect(valid).to.be(false);
            done();
        });
    });

    it('fails on non-existent name', function(done) {
        this.timeout(30e3);
        emailExistence('shouldnotexists@gmail.com', function(err, valid) {
            // expect(err).to.match(/^550/);
            expect(valid).to.be(false);
            done();
        });
    });

    it('recognizes valid hotmail', function(done) {
      this.timeout(30e3);
      emailExistence('and285@hotmail.com', function(err, valid) {
        expect(err).to.match(null);
        expect(valid).to.be(true);
        done(err);
      });
    });
});
