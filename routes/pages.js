const express = require('express');
const router = express.Router();
const Game = require('./../models/game');
const User = require('./../models/user');


router.get('/', (req, res) => {
    res.render('pages/index');
});

const addUserToUrl = (req, res, next) => {

    // console.log('middle_ware');
    // req.url = req.url + `hoi`
    // req.url = `${req.url}hoi`
    console.log('middleware')
    // console.log(req.url);
    // req.query = 'hoi'

    // const url = require('url');

    // let parsedUrl = url.parse(req.originalUrl, true);
    // parsedUrl.query.page = currentPage;
    // delete parsedUrl.search;
    // let newUrl = url.format(parsedUrl);

    // req.query.user = 'mike'
    
    // console.log(req.query.user)
    // console.log(querystring.parse('asdf'))
    // req.query = req.query + 'hoi'
    // console.log(querystring.parse(qs));
    // console.log(req.querystring.parse(qs))
     // if this isn't added, the `query` middleware will assume the query string is already parsed
    // req.url   = req.url + `?id=someID&product=bag`;
    // req.query = null; // if this isn't added, the `query` middleware
    //                     // will assume the query string is already parsed
    // next();

    // req.query.user      = 'someID';
    next();
}

// router.get('/play:id', async (req, res) => {
//     console.log('asdf');
//     res.render('/pages/play');
// })

router.get('/play/:id', addUserToUrl, async (req, res) => {
    // const game = await Game.findById(req.params.id);
    // const new_user = new User({
    //     name: req.body.name_field,
    //     in_game: true
    // });
    // game.users.push(new_user);
    // await game.save();
    // console.log(req.url);
    // req.url = null;
    res.render('pages/play');
});

router.get('/chat', (req, res) => {
    res.render('pages/chat');
})

module.exports = router;