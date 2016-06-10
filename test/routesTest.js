var expect = require('chai').expect;
var sinon = require('sinon');

var routes = require('../src/routes');
var Meme = require('../src/Meme');

describe('routes', function() {
	beforeEach(function() {
		sinon.stub(Meme, 'find');
	});


	afterEach(function() {
		Meme.find.restore();
	});

	it('should send all memes', function() {
		var a = { name: 'a' };
		var b = { name: 'b' };
		var expectedModels = [a, b];
		Meme.find.yields(null, expectedModels);
		var req = { params: { } };
		var res = {
			send: sinon.stub()
		};

		routes.allMemes(req, res);

		sinon.assert.calledWith(res.send, expectedModels);
	});

	it('should query for non-reposts if set as request parameter', function() {
		Meme.find.yields(null, []);
		var req = {
			params: {
				reposts: true
			}
		};
		var res = { send: sinon.stub() };

		routes.allMemes(req, res);

		sinon.assert.calledWith(Meme.find, { repost: true });
	});
});
