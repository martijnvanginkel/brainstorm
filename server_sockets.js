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

    socket.on('user_pressed_ready', (user_id, percentage) => {
        socket.broadcast.to(game_key).emit('user_ready', user_id, percentage);
    })

    socket.on('disconnect', async () => {
        await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${this_user.id}`, {
            method: 'PUT',
            body: {}
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });

        io.to(game_key).emit('user_disconnect', this_user.id); // Let everyone know
    })
}

module.exports = { on_connection }