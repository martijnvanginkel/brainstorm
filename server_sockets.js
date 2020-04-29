const fetch = require("node-fetch");

const on_connection = (socket, io) => {
    console.log('New connection..');
    
    let game_key = null;

    const this_user = {
        id: null,
        name: null
    }

    socket.emit('user_joined'); // Emit to single client thats connecting

    socket.on('initialize_user', (new_user, key, percentage) => {
        this_user.id = new_user._id
        this_user.name = new_user.name;
        game_key = key;
        socket.join(key);
        socket.broadcast.to(key).emit('user_initialized', this_user.id, this_user.name, percentage);
    });

    socket.on('subject_changed', (subject, key) => {
        socket.broadcast.to(key).emit('subject_changed', subject);
    });

    socket.on('user_pressed_ready', async (user_id, percentage, subject) => {
        socket.broadcast.to(game_key).emit('user_ready', user_id, percentage);

        if (percentage === 100) {
            console.log(subject);
            await fetch(`http://localhost:5000/api/games/lock_game/${game_key}`, {
                method: 'PUT',
                body: {}
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                return data;
            });

            io.to(game_key).emit('game_started');
        }
    });

    socket.on('message', (message) => {
        io.to(game_key).emit('message', message);
    })

    socket.on('disconnect', async () => {
        const game = await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${this_user.id}`, {
            method: 'PUT',
            body: {}
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });
        console.log(game);
        io.to(game_key).emit('user_disconnect', this_user.id); // Let everyone know
    });
}

module.exports = { on_connection }