const mongoose = require('mongoose');

const game_schema = new mongoose.Schema({
    key: {
        type: String
    },
    open: {
        type: Boolean
    }
});

module.exports = mongoose.model('Game', game_schema);