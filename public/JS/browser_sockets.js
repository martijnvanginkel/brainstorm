const socket = io();



const addPlayerLabel = (player_name) => {
    const parent = document.getElementById('joined_players');
    const player_el = document.createElement('span');

    player_el.className = 'joined_player';
    player_el.innerHTML = player_name;
    parent.append(player_el);
}


// socket.on('message', message => {
//     console.log(message);
// });

socket.on('player_joined', () => {
    const url = new URL(window.location.href);
    const name = url.searchParams.get("name");
    console.log(name);
    socket.emit('initialize_player', name);
})

socket.on('player_initialized', (player_name) => {
    addPlayerLabel(player_name);
})

socket.on('player_disconnect', (player_name) => {
    console.log('hoi')
    console.log(player_name)
})


const chat_form = document.getElementById('chat_form');

chat_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.chat_input.value;
    
    socket.emit('chat_message', message);
})