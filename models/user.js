const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name: {
        type: String
    },
    name_add_on: {
        type: Number
    },
    lobby_ready: {
        type: Boolean
    },
    in_game: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', user_schema);