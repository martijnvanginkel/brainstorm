import { formatMessage } from './messages.js'

const removeLobby = () => {
    const lobby = document.getElementById('lobby_container');
    lobby.remove();
}

const setupPlayerLabels = (users) => {
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
        <input id="text_field" type="text" required>
        <button class="button is-light">Send</button>
    `;
    container.append(form);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const message = e.target.elements.text_field.value;
        socket.emit('message', formatMessage(message));

        e.target.elements.text_field.value = '';
        e.target.elements.text_field.focus();
    });
    return form;
}

const createGameLayout = () => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    const player_tags = document.createElement('div');
    const play_area = document.createElement('div');

    container.className = 'game_container';
    player_tags.id = 'player_tags';
    play_area.id = 'play_area';
    body.append(container);
    container.append(player_tags);
    container.append(play_area);
}

const setupGamePage = (users) => {
    removeLobby();
    createGameLayout();
    setupPlayerLabels(users);
}

export { setupGamePage, setupChatForm };