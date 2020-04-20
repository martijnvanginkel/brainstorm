const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    name: {
        type: String
    },
    in_game: {
        type: Boolean
    }
});

module.exports = mongoose.model('User', user_schema);