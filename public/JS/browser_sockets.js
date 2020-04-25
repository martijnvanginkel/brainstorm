const socket = io();

let game_key = null;
const user_labels = [];

class UserLabel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.element = this.createElement();
    }

    createElement() {
        const parent = document.getElementById('joined_users');
        const user_element = document.createElement('div');
    
        user_element.className = 'joined_user';
        user_element.innerHTML = `
            <span class="joined_user_name">${this.name}</span>
            <span class="joined_user_icon"><i class="fa fa-user-o" aria-hidden="true"></i></span>
            <button type="button" id="ready_btn">Ready</button>
        `;
        // user_element.innerHTML = this.name;
        parent.append(user_element);
        user_labels.push(this);
        return user_element;
    }

    async removeElement() {
        this.element.remove();
        user_labels.splice(this);
    }
}

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

    // console.log(users);
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

    // console.log(new_user);

    socket.emit('initialize_user', new_user, game_key);
});

socket.on('user_initialized', (id, name) => {
    new UserLabel(id, name);

    console.log(user_labels);
});

const findUserLabelById = (id) => {
    return (user) => {
        return user.id === id;
    }
}

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


    console.log(response);

    user.removeElement();


});
