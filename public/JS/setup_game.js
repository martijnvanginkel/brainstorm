import { formatWord } from './word_controller.js';
import { filterOnlineUsers } from './lobby_utils.js';
import { fetchNewWord } from './browser_sockets.js';

const removeLobby = () => {
    const lobby = document.getElementById('lobby_container');
    lobby.remove();
}

const insertPlayerLabels = (users) => {
    const parent = document.getElementById('player_tags');

    users.forEach(user => {
        const tag = document.createElement('span');
        tag.className = 'player_tag';
        tag.innerHTML = `${user.name}`;
        parent.append(tag);
    });
}

const setupChatForm = (socket) => {
    const container = document.querySelector('.game_container');
    const form = document.createElement('form');

    form.id = 'chat_form';
    form.innerHTML = `
        <input id="text_field" type="text" autocomplete="off" autofocus required>
        <button class="button is-light">Send</button>
    `;
    container.append(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const text_field_value = e.target.elements.text_field.value;
        const new_word = await fetchNewWord(text_field_value);
        socket.emit('word_pushed', formatWord(new_word));

        e.target.elements.text_field.value = '';
        e.target.elements.text_field.focus();
    });
    return form;
}

const createGameLayout = (game) => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    const player_tags = document.createElement('div');
    const play_area = document.createElement('div');
    const circle = document.createElement('div');

    container.className = 'game_container';
    player_tags.id = 'player_tags';
    play_area.id = 'play_area';
    circle.id = 'circle_button';
    circle.innerHTML = `${game.subject}`;

    body.append(container);
    container.append(player_tags);
    container.append(play_area);
    play_area.append(circle);
}

const setupGamePage = (game) => {
    const users = game.users.filter(filterOnlineUsers);

    removeLobby();
    createGameLayout(game);
    insertPlayerLabels(users);
}

export { setupGamePage, setupChatForm };