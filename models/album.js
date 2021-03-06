var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: [],
	songs: [new Schema({name: String,
		trackNumber: Number})];
});
var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;;