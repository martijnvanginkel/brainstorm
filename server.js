const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const server_sockets = require('./server_sockets.js');

const socket_io = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socket_io(server);

const pageRouter = require('./routes/pages');
const gameApiRouter = require('./routes/api/games');


mongoose.connect('mongodb://localhost/brainstorm', { useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());


// Routes
app.use('/', pageRouter);
app.use('/api/games', gameApiRouter);

io.on('connection', socket => {
    server_sockets.on_connection(socket, io)
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
