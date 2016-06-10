var expect = require('chai').expect;
var sinon = require('sinon');
var Promise = require('promise-polyfill');

var Meme = require('../src/Meme');

describe('meme', function() {
	it('should be invalid if name is empty', function(done) {
		var m = new Meme();

		m.validate(function(err) {
			expect(err.errors.name).to.exist;
			done();
		});
	});

	it('should have validation error for repost if not dank', function(done) {
		var m = new Meme({ repost: true });

		m.validate(function(err) {
			expect(err.errors.repost).to.exist;
			done();
		});
	});

	it('should be valid repost when dank', function(done) {
		var m = new Meme({ repost: true, dank: true });

		m.validate(function(err) {
			expect(err.errors.repost).to.not.exist;
			done();
		});
	});

	it('should check for reposts with same name', sinon.test(function() {
		this.stub(Meme, 'findOne');
		var expectedName = 'This name should be used in the check';
		var m = new Meme({ name: expectedName });

		m.checkForReposts(function() { });

		sinon.assert.calledWith(Meme.findOne, {
			name: expectedName,
			repost: true
		});
	}));

	it('should call back with true when repost exists', sinon.test(function(done) {
		var repostObject = { name: 'foo' };
		this.stub(Meme, 'findOne').yields(null, repostObject);
		var m = new Meme({ name: 'some name' });

		m.checkForReposts(function(hasReposts) {
			expect(hasReposts).to.be.true;
			done();
		});
	}));
});
