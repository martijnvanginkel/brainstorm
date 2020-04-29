import { UserLabel, user_labels, percentageOfUsersReady } from './user_label.js';
import { setupGamePage, setupChatForm } from './setup_game.js';
import { spawnMessage } from './messages.js';
import { filterOnlineUsers, findUserLabelById, updateProgressBar, removeUserFromLobby } from './lobby_utils.js';

const socket = io();

let game_key = null;
let game_subject = null;

const fetchGetGame = async () => {
    const game = await fetch(`http://localhost:5000/api/games/${game_key}`, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return game;
}

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

const fetchUpdateSubject = async (subject) => {
    const game = await fetch(`http://localhost:5000/api/games/${game_key}/update_subject/${subject}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return game;
}

const userPressedReady = (user_id, percentage, subject) => {
    updateProgressBar(percentage);
    socket.emit('user_pressed_ready', user_id, percentage, subject);
}

/* This only gets called for the player itself */
socket.on('user_joined', async () => {
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    game_key = url.searchParams.get("game_key");

    /* Add labels for users already in the game */
    const game = await fetchGetGame();
    let users = game.users.filter(filterOnlineUsers);
    users.forEach(user => new UserLabel(user._id, user.name, false, user.lobby_ready));

    /* Add new user to the game */
    const new_user = await fetchAddUser(name);
    new UserLabel(new_user._id, new_user.name, true, false);

    /* Set progress bar */
    users.push(new_user);
    const percentage = percentageOfUsersReady(users);
    updateProgressBar(percentage);

    /* Update subject */
    game_subject = document.getElementById('game_subject');
    game_subject.value = game.subject;
    game_subject.addEventListener('change', async (e) => {
        const value = e.target.value;
        await fetchUpdateSubject(value);
        socket.emit('subject_changed', value, game_key);
    });

    socket.emit('initialize_user', new_user, game_key, percentage);
});

socket.on('user_initialized', (id, name, percentage) => {
    new UserLabel(id, name, false, false);
    updateProgressBar(percentage)
});

socket.on('subject_changed', (subject) => {
    game_subject.value = subject;
});

socket.on('user_ready', (user_id, percentage) => {
    const user = user_labels.find(findUserLabelById(user_id));

    user.setUserReady();
    updateProgressBar(percentage);
});

socket.on('game_started', async () => {
    const game = await fetchGetGame();

    setupGamePage(game);
    setupChatForm(socket);
});

socket.on('message', (message) => {
    spawnMessage(message);
});

socket.on('user_disconnect', (user_id) => {

    removeUserFromLobby(game_key, user_id, user_labels);

    user_labels.forEach((user_label) => user_label.setUserUnready());
    updateProgressBar(0);
});

export { fetchSetUserReady, userPressedReady }
