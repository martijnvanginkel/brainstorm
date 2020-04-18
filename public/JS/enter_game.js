const create_btn = document.getElementById('create_game_btn');
const join_btn = document.getElementById('join_game_btn');
const game_key = document.getElementById('game_key_input');
const copy_key_btn = document.getElementById('copy_key_btn');
const index_message = document.getElementById('index_message');

const checkForKey = async (key) => {
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
    game_key.select();
    game_key.setSelectionRange(0, 99999)
    document.execCommand("copy");
    showMessage('Link copied to clipboard.', 'green');
}

copy_key_btn.addEventListener('click', () => {
    copyKey();
});

game_key.addEventListener('dblclick', (e) => {
    if (e.target.value !== '') {
        copyKey();
    }
});

join_btn.addEventListener('click', async () => {
    if (game_key.value === '') {
        showMessage('You need a key to join a game', 'yellow');
        return ;
    }
    const key = await checkForKey(game_key.value);

    if (key === null) {
        showMessage('No valid key was found', 'yellow');
    }
    else {
        console.log('get request');
    }

});

create_btn.addEventListener('click', async () => {
    const new_game = await createNewGame();
    game_key.value = new_game.key;
    copyKey();
    
    console.log(new_game);
});

