
const on_connection = (socket, io) => {
    console.log('New connection..');


    socket.emit('welcome', 'Welcome to the chat'); // Emit to single client thats connecting

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat'); // Let everyone know
    })

    socket.on('chat_message', message => {
        io.emit('message', message);
        // console.log(message);
    });
}

module.exports = { on_connection }