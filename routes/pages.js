const express = require('express');
const router = express.Router();
const Game = require('./../models/game');
const User = require('./../models/user');


router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/lobby', async (req, res) => {
    res.render('pages/lobby');
});

router.get('/game', async (req, res) => {
    res.render('pages/game');
});

router.get('/chat', (req, res) => {
    res.render('pages/chat');
});

module.exports = router;