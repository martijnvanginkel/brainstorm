const mongoose = require('mongoose');
const User = require('./user');

const word_schema = new mongoose.Schema({
    value: {
        type: String
    }
});

module.exports = mongoose.model('Word', word_schema);