import { UserLabel, user_labels, findUserLabelById } from './user_label.js';
const socket = io();

let game_key = null;

/* This only gets called for the player itself */
socket.on('user_joined', async (welcome_message) => {
    console.log(welcome_message);
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    game_key = url.searchParams.get("game_key");

    const users = await fetch(`http://localhost:5000/api/games/${game_key}/get_users`, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });

    /* Add labels for users already in the game */
    users.forEach(user => {
        new UserLabel(user._id, user.name);
    })

    const new_user = await fetch(`http://localhost:5000/api/games/${game_key}/add_user/${name}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });

    /*
        Add myself to the list and send an broadcast.io for everyone else 

    */

    socket.emit('initialize_user', new_user, game_key);
});

socket.on('user_initialized', (id, name) => {
    new UserLabel(id, name);
});

socket.on('user_disconnect', async (user_id) => {
    const user = user_labels.find(findUserLabelById(user_id));
    const response = await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${user.id}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });

    user.removeElement();
});
