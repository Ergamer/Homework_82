const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    singer: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    }
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
