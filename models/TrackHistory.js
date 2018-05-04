const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    track: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Track'
    },
    datetime: {
        type: String,
        required: true,
    }
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

module.exports = TrackHistory;
