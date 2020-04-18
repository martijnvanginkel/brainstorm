const express = require('express');
const router = express.Router();
const Game = require('../../models/game');

const generateRandomKey = () => {
    let key_code = '';
    const key_length = 14;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const chars_length = chars.length;

    for (let i = 0; i < key_length; i++) {
        key_code += chars[Math.floor(Math.random() * chars_length)];
    }
    return key_code;
}

router.post('/new', async (req, res) => {
    const game = new Game({
        key: generateRandomKey()
    });
    try {
        const new_game = await game.save();
        res.status(201).json(new_game); // 201 is successful object created
    }
    catch (error) {
        res.status(400).json({ message: error.message }); // 400 is user gives wrong input and not with server
    }
});

module.exports = router;