import generateRandomName from './generate_name.js'

const create_btn = document.getElementById('create_game_btn');
const join_btn = document.getElementById('join_game_btn');
const game_key_input = document.getElementById('game_key_input');
const copy_key_btn = document.getElementById('copy_key_btn');
const index_message = document.getElementById('index_message');
let name_form = null;

const checkForValidGame = async (key) => {
    const response = await fetch(`http://localhost:5000/api/games/${key}`, {
        method: 'GET'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return response;
}

const createNewGame = async () => {
    const response = await fetch('http://localhost:5000/api/games/new', {
        method: 'POST',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return response;
}

const showMessage = (text, color) => {
    index_message.innerHTML = text;
    index_message.className = '';
    index_message.classList.add(`${color}`);
    setTimeout(() => index_message.classList.add('hide_element'), 1000); 
}

const copyKey = () => {
    game_key_input.select();
    game_key_input.setSelectionRange(0, 99999)
    document.execCommand("copy");
    showMessage('Link copied to clipboard.', 'green');
}

const addNameForm = (new_game) => {
    const parent = document.getElementById('index_content');
    const form = document.createElement('form');

    form.action = `/lobby`; // change this into a
    form.method = `GET`;
    form.id = 'name_form'
    form.enctype = "application/json"

    form.innerHTML = `
        <input type="hidden" name="game_key" id="game_key_field" value="${new_game.key}">
        <input type="text" name="name" id="name_field" class="input" placeholder="Your name?">
        <button type="submit" id="play_btn" class="button is-primary">Play</button>
    `;
  
    form.addEventListener('submit', (e) => {
        if (name_field.value === '') {
            e.preventDefault();
            showMessage('You need a name you silly', 'yellow');
            name_field.value = generateRandomName();
        }
    });

    name_form = form;
    parent.insertBefore(form, index_message);
}

const removeNameForm = () => {
    if (name_form === null) {
        return ;
    }
    name_form.remove();
    name_form = null;
}

copy_key_btn.addEventListener('click', () => {
    if (game_key_input.value === '') {
        showMessage('Nothing to be copied', 'yellow');
    }
    else {
        copyKey();
    }
});

game_key_input.addEventListener('dblclick', (e) => {
    if (e.target.value !== '') {
        copyKey();
    }
});

join_btn.addEventListener('click', async () => {
    if (game_key_input.value === '') {
        showMessage('You need a key to join a game', 'yellow');
        return ;
    }
    const new_game = await checkForValidGame(game_key_input.value);
    if (new_game === null) {
        showMessage('Not a valid key', 'yellow');
        removeNameForm();
        return ;
    }
    if (name_form === null) {
        addNameForm(new_game);
    } 
});

create_btn.addEventListener('click', async () => {
    const new_game = await createNewGame();
    game_key_input.value = new_game.key;
    copyKey();
    removeNameForm();
});

