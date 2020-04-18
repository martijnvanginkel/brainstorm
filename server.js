const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const socket_io = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket_io(server);

const pageRouter = require('./routes/pages');
const gameApiRouter = require('./routes/api/games');


mongoose.connect('mongodb://localhost/brainstorm', { useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Routes
app.use('/', pageRouter);
app.use('/api/games', gameApiRouter);


io.on('connection', socket => {
    console.log('New connection..');

    socket.emit('welcome', 'Welcome to the chat'); // Emit to single client thats connecting

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat'); // Let everyone know
    })

    socket.on('chat_message', message => {
        io.emit('message', message);
        // console.log(message);
    });
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
