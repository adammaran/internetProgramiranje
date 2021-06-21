const mongoose = require('mongoose');
const Team = require('./team');

const matchSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    guest: {
        type: String,
        required: true
    },
    hostPoints: {
        type: Number, 
        required: true
    },
    guestPoints: {
        type: Number, 
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;