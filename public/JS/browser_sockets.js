// import { UserLabel, user_labels, findUserLabelById } from './user_label.js';
const socket = io();

let game_key = null;

const user_labels = [];

class UserLabel {
    constructor(id, name, is_me, lobby_ready) {
        this.id = id;
        this.name = name;
        this.element = this.createElement(is_me, id, lobby_ready);
        this.lobby_ready = lobby_ready;
    }

    addReadyButton(user_element) {
        const ready_btn = document.createElement('button');
        ready_btn.type = 'button';
        ready_btn.id = 'ready_btn';
        ready_btn.innerHTML = 'Ready';
        ready_btn.addEventListener('click', async (e) => {

            const game = await fetchSetUserReady(this.id);

            console.log(game);
            /*

                if all users are ready then lock the game and start the countdown for all users

            */

            e.target.disabled = true;
            e.target.className = 'disable_hover'
            // e.
            console.log(e.target.parentElement);
            e.target.parentElement.classList.add('ready_joined_user')
            socket.emit('user_is_ready', this.id);
        })
        user_element.append(ready_btn);
    }

    createElement(is_me, user_id, lobby_ready) {
        const parent = document.getElementById('joined_users');
        const user_element = document.createElement('div');
    
        user_element.className = 'joined_user';
        user_element.innerHTML = `<span class="joined_user_name">${this.name}</span>`;

        if (is_me) {
            this.addReadyButton(user_element);
        }
        else {
            const ready_el = document.createElement('span');
            ready_el.className = 'ready_el';
            ready_el.innerHTML = 'Not ready';
            user_element.append(ready_el);
            if (lobby_ready === true) {

                ready_el.innerHTML = 'Ready';
                user_element.classList.add('ready_joined_user');
            }
        }
        parent.append(user_element);
        user_labels.push(this);
        return user_element;
    }

    setUserReady() {
        this.element.querySelector('.ready_el').innerHTML = 'ready'
        this.element.classList.add('ready_joined_user');
    }

    removeElement() {
        this.element.remove();
        user_labels.splice(this);
    }
}

const findUserLabelById = (id) => {
    return (user) => {
        return user.id === id;
    }
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

/* This only gets called for the player itself */
socket.on('user_joined', async () => {


    // socket.on('joinGame', () => {

        const url = new URL(window.location.href);
        const name = url.searchParams.get("name");
    
        game_key = url.searchParams.get("game_key");
    
    
        const users = await fetchAllUsers();
    
        /* Add labels for users already in the game */
        users.forEach(user => {
            new UserLabel(user._id, user.name, false, user.lobby_ready)
        });
    
        const new_user = await fetchAddUser(name);
    
        new UserLabel(new_user._id, new_user.name, true, false);
    
        socket.emit('initialize_user', new_user, game_key);

    // });

});

socket.on('user_initialized', (id, name) => {
    new UserLabel(id, name, false);
});

socket.on('lobby_user_ready', (user_id) => {
    const user = user_labels.find(findUserLabelById(user_id));

    // user.element.in
    user.setUserReady();
})

socket.on('user_disconnect', async (user_id) => {
    const user = await user_labels.find(findUserLabelById(user_id));

    await fetchRemoveUser(user.id);
    user.removeElement();
});
