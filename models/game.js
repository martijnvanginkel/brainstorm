const mongoose = require('mongoose');
const User = require('./user')

const game_schema = new mongoose.Schema({
    key: {
        type: String
    },
    open: {
        type: Boolean
    },
    users: [User.schema]
});

module.exports = mongoose.model('Game', game_schema);