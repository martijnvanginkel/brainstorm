import { UserLabel, user_labels, percentageOfUsersReady } from './user_label.js';
import { setupGamePage, setupChatForm } from './setup_game.js';
import { spawnMessage } from './messages.js'

const socket = io();

let game_key = null;
let game_subject = null;

const fetchGetGame = async () => {
    const users = await fetch(`http://localhost:5000/api/games/${game_key}`, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return users;
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

/* where is this used? */
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

const updateProgressBar = (percentage) => {
    const bar = document.getElementById('progress_bar');
    bar.value = percentage;
}

const userPressedReady = (user_id, percentage, subject) => {
    updateProgressBar(percentage);
    socket.emit('user_pressed_ready', user_id, percentage, subject);
}

// const filterOnlineUsers = (user) => {
//     if (user.in_game == true) {
//         return user;
//     }
//     // return user.in_game === true;
// }

/* This only gets called for the player itself */
socket.on('user_joined', async () => {
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    game_key = url.searchParams.get("game_key");

    let users = await fetchAllUsers();
    // const game = await fetchGetGame();

    // let users = game.users.filter(filterOnlineUsers);
    // let users = game.users;
    // console.log(users);
    // let users = game.users.filter(filterOnlineUsers);
    // console.log(new_users);

    /* Add labels for users already in the game */
    users.forEach(user => new UserLabel(user._id, user.name, false, user.lobby_ready));

    /* Add new user to the game */
    const new_user = await fetchAddUser(name);
    // my_user_id = new_user._id;
    new UserLabel(new_user._id, new_user.name, true, false);

    /* Set progress bar */
    users.push(new_user);
    const percentage = percentageOfUsersReady(users);
    updateProgressBar(percentage);

    game_subject = document.getElementById('game_subject');
    // game_
    game_subject.addEventListener('change', async (e) => {
        const value = e.target.value;
        const subject = await fetchUpdateSubject(value);
        // console.log('after fetch');
        // console.log(subject);
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
    const users = await fetchAllUsers();

    setupGamePage(users);
    setupChatForm(socket);
});

socket.on('message', (message) => {
    // console.log(message);
    spawnMessage(message);
});

const findUserLabelById = (id) => {
    return (user) => {
        return user.id === id;
    }
}

socket.on('user_disconnect', async (user_id) => {
    console.log('other user disconnected');
    
    // const user = await user_labels.find(findUserLabelById(user_id));
    // user.removeElement();
    // await fetchRemoveUser(user.id);

    // console.log(user_labels);
    const user = user_labels.find(findUserLabelById(user_id));
    // console.log(user);
    // user.removeElement();
    // user_labels.splice(0, 1);

    console.log(user_labels)

    for (let i = 0; i < user_labels.length; i++) {
        if (user_labels[i].id == user.id) {
            await fetchRemoveUser(user.id);
            user_labels[i].removeElement();
            user_labels.splice(i, 1);
            break;
        }
        
    }
    console.log(user_labels)

    
    for (let i = 0; i < user_labels.length; i++) {
        user_labels[i].setUserUnready();
    }
    
    // console.log(user_labels);
    // user_labels.forEach((user_label) => {
    //     // console.log(user_label);
    //     // if (user_label.id == user_id) {
    //     //     user_label.removeElement();
    //     // }
    //     // user_label.setUserUnready();
    // });
    updateProgressBar(0);
    
});

export { fetchSetUserReady, userPressedReady }
