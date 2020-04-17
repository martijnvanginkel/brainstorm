const index_container = document.querySelector('.index_container');
const create_btn = document.getElementById('create_game_btn');
const join_btn = document.getElementById('join_game_btn');

const showKeyContainer = (key) => {
    const container = document.createElement('div');
    
    container.className = 'key_container';
    container.innerHTML = `
        <div id="game_key">
            <input type="text" name="game_key" id="game_key_input" value="${key}">
            <button type="button" id="play_game_btn">Play</button>
        </div>
        <span id="key_description">Click key to copy</span>
    `;
    index_container.append(container);
    return container;
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

join_btn.addEventListener('click', (e) => {
    if (document.querySelector('.key_container') !== null) {
        return;
    }
    showKeyContainer('');
});

create_btn.addEventListener('click', async (e) => {

    const new_game = await createNewGame();
    const key_container = showKeyContainer(new_game.key);
    const input = key_container.children.game_key.children.game_key_input;

    // input.readonly = 'readonly';
    input.readOnly = true;
    input.addEventListener('click', (e) => {
        e.target.select();
        e.target.setSelectionRange(0, 99999)
        document.execCommand("copy");
    })
});

