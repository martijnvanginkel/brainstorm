const express = require('express');
const router = express.Router();
// const Game = require('./../models/game');

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/chat', (req, res) => {
    res.render('pages/chat');
})

module.exports = router;