const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.post('/play/:id', (req, res) => {
    res.render('pages/play');
});

router.get('/chat', (req, res) => {
    res.render('pages/chat');
})

module.exports = router;