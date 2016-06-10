var mongoose = require('mongoose');


var memeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	dank: { type: Boolean },
	repost: {
		type: Boolean,
		validate: function(v) {
			return v === true && this.dank === true;
		}
	}
});

memeSchema.methods.checkForReposts = function(cb) {
	this.model('Meme').findOne({
		name: this.name,
		repost: true
	}, function(err, val) {
		cb(!!val);
	});
};

module.exports = mongoose.model('Meme', memeSchema);
