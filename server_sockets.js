const fetch = require("node-fetch");

const on_connection = (socket, io) => {
    console.log('New connection..');
    
    let game_key = null;

    const this_user = {
        id: null,
        name: null
    }

    socket.emit('user_joined'); // Emit to single client thats connecting

    socket.on('initialize_user', (new_user, key) => {
        this_user.id = new_user._id
        this_user.name = new_user.name;
        game_key = key;
        socket.broadcast.emit('user_initialized', this_user.id, this_user.name);
    });

    socket.on('user_is_ready', (user_id) => {
        socket.broadcast.emit('lobby_user_ready', user_id);
    })

    socket.on('disconnect', async () => {
        console.log('I myself disconnected')

        const response = await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${this_user.id}`, {
            method: 'PUT',
            body: {}
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            return data;
        });

        console.log(this_user.id)

        io.emit('user_disconnect', this_user.id); // Let everyone know
        // this_user.id = null;
        // this_user.name = null;
    })
}

module.exports = { on_connection }