const express = require('express');
const router = express.Router();
const Game = require('./../../models/game');
const User = require('./../../models/user');

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

router.get('/:key', async (req, res) => {
    try {
        const game = await Game.findOne({ key: req.params.key });
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

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

const checkForAddOn = (cur_users, new_user) => {
    let duplicants = 0;
    cur_users.forEach(user => {
        if (user.name == new_user) {
            duplicants++;
        }
    });
    return ` (${duplicants})`
}

const filterOnlineUsers = (user) => user.in_game === true;

router.get('/:key/get_users', async (req, res) => {
    try {
        const game = await Game.findOne({ key: req.params.key });
        const users = game.users.filter(filterOnlineUsers);
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.put('/:key/add_user/:user', async (req, res) => {
    try {
        const game = await Game.findOne({ key: req.params.key });
        const new_user = new User({
            name: req.params.user,
            name_add_on: checkForAddOn(game.users, req.params.user),
            lobby_ready: false,
            in_game: true
        });
        game.users.push(new_user);
        await game.save();
        res.json(new_user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

function findUserById(id) {
    return function(user_el) {
        return user_el.id === id;
    }
}

router.put('/:key/set_user_ready/:user_id', async (req, res) => {
    try {
        const game = await Game.findOne({ key: req.params.key });
        const user = game.users.find(findUserById(req.params.user_id))
        user.lobby_ready = true;
        await game.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }  
});


router.put('/:key/remove_user/:user_id', async (req, res) => {
    try {
        const game = await Game.findOne({key: req.params.key});

        const user = game.users.find(findUserById(req.params.user_id))
        user.in_game = false;
        await game.save();
        // console.log(game);


        // User.find({name:'vlad','links.url':req.params.query}, function(err, foundUsers){
        //     // ---
        //  });

        // Game.find({'links.url':req.params.query}, function(err, foundUsers){
        //     // ---
        //  });

        // console.log(game);
        // const user = new User({
        //     name: req.params.user,
        //     in_game: true
        // });
        // game.users.push(user);
        // await game.save();
        console.log('left game');
        console.log(game);
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;