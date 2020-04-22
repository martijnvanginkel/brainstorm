const socket = io();

let game_key = null;
const player_labels = [];

class PlayerLabel {
    constructor(name) {
        this.name = name;
        this.element = this.createElement();
        // this_player_label = this;
    }

    createElement() {
        const parent = document.getElementById('joined_players');
        const player_el = document.createElement('span');
    
        player_el.className = 'joined_player';
        player_el.innerHTML = this.name;
        parent.append(player_el);
        this.addToList();
        return player_el;
    }

    addToList() {
        player_labels.push(this);
    }

    // removeFromList() {
    //     player_labels.splice(this);
    // }
}

/* This only gets called for the player itself */
socket.on('player_joined', async (welcome_message) => {
    console.log(welcome_message);
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    game_key = url.searchParams.get("game_key");

    /*
        Fetch put request the gamekey and the player to the db
    */
   const response = await fetch(`http://localhost:5000/api/games/${game_key}/add_user/${name}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });

    console.log(response);
    if (response.users.length > 0) {

        response.users.forEach((user) => {
            new PlayerLabel(user.name);
            // console.log(user)
        })
    }

    console.log(player_labels)


    socket.emit('initialize_player', name);
})

socket.on('player_initialized', (player_name) => {

    /*
        create a new player label

    */


    new PlayerLabel(player_name);
})

socket.on('player_disconnect', (player_name) => {
    console.log('hoi')
    console.log(player_name)
    player_labels.forEach((player) => {
        if (player.name == player_name) {
            console.log(player.element)
            player.element.remove();
        }
    })

})


// const chat_form = document.getElementById('chat_form');

// chat_form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const message = e.target.elements.chat_input.value;
    
//     socket.emit('chat_message', message);
// })