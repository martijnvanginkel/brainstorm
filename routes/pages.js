const express = require('express');
const router = express.Router();
const Game = require('./../models/game');
const User = require('./../models/user');


router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/play/:id', async (req, res) => {
    res.render('pages/play');
});

router.get('/chat', (req, res) => {
    res.render('pages/chat');
})

module.exports = router;