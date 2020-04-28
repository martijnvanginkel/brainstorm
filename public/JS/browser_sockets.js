import { UserLabel, user_labels, findUserLabelById, percentageOfUsersReady } from './user_label.js';
import { setupGame } from './setup_game.js';

const socket = io();

let game_key = null;

const fetchAddUser = async (name) => {
    const new_user = await fetch(`http://localhost:5000/api/games/${game_key}/add_user/${name}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return new_user;
}

const fetchRemoveUser = async (user_id) => {
    const response = await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${user_id}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return response;
}

const fetchAllUsers = async () => {
    const users = await fetch(`http://localhost:5000/api/games/${game_key}/get_users`, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return users;
}

const fetchSetUserReady = async (user_id) => {
    const game = await fetch(`http://localhost:5000/api/games/${game_key}/set_user_ready/${user_id}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return game;
}

const updateProgressBar = (percentage) => {
    const bar = document.getElementById('progress_bar');
    bar.value = percentage;
}

const userPressedReady = (user_id, percentage) => {
    updateProgressBar(percentage);
    socket.emit('user_pressed_ready', user_id, percentage);
}

/* This only gets called for the player itself */
socket.on('user_joined', async () => {
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    game_key = url.searchParams.get("game_key");
    let users = await fetchAllUsers();

    /* Add labels for users already in the game */
    users.forEach(user => new UserLabel(user._id, user.name, false, user.lobby_ready));

    /* Add new user to the game */
    const new_user = await fetchAddUser(name);
    new UserLabel(new_user._id, new_user.name, true, false);

    /* Set progress bar */
    users.push(new_user);
    const percentage = percentageOfUsersReady(users);
    updateProgressBar(percentage);

    socket.emit('initialize_user', new_user, game_key, percentage);
});

socket.on('user_initialized', (id, name, percentage) => {
    new UserLabel(id, name, false, false);
    updateProgressBar(percentage)
});

socket.on('user_ready', (user_id, percentage) => {
    const user = user_labels.find(findUserLabelById(user_id));

    user.setUserReady();
    updateProgressBar(percentage);
})

socket.on('game_started', async () => {
    const users = await fetchAllUsers();

    setupGame(users);
});

socket.on('user_disconnect', async (user_id) => {
    const user = await user_labels.find(findUserLabelById(user_id));

    await fetchRemoveUser(user.id);
    user.removeElement();
});

export { fetchSetUserReady, userPressedReady }
