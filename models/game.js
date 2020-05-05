const mongoose = require('mongoose');
const User = require('./user');
const Word = require('./word');

const game_schema = new mongoose.Schema({
    key: {
        type: String
    },
    open: {
        type: Boolean
    },
    subject: {
        type: String
    },
    users: [User.schema],
    words: [Word.schema]
});

module.exports = mongoose.model('Game', game_schema);