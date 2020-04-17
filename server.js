const path = require('path');
const http = require('http');
const express = require('express');
const socket_io = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', socket => {
    console.log('New connection..');

    socket.emit('welcome', 'Welcome to the chat'); // Emit to single client thats connecting

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat'); // Let everyone know
    })


    // Listen for chat message

    socket.on('chat_message', message => {
        io.emit('message', message);
        // console.log(message);
    });

});



const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
