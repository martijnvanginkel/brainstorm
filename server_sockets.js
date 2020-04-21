let this_player = null;

const on_connection = (socket, io) => {
    console.log('New connection..');

    socket.emit('player_joined', 'Welcome'); // Emit to single client thats connecting

    socket.on('initialize_player', (player_name) => {
        console.log(player_name)
        this_player = player_name;
        io.emit('player_initialized', player_name);
    })


    socket.on('disconnect', () => {
        io.emit('player_disconnect', this_player); // Let everyone know
    })

    socket.on('chat_message', message => {
        io.emit('message', message);
        // console.log(message);
    });
}

module.exports = { on_connection }