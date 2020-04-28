const removeLobby = () => {
    const lobby = document.getElementById('lobby_container');
    lobby.remove();
}

const setupPlayerLabels = (users) => {
    const body = document.querySelector('.content');
    const player_tags = document.createElement('div');

    player_tags.id = 'player_tags';
    body.append(player_tags);

    users.forEach(user => {
        const tag = document.createElement('span');
        tag.className = 'player_tag';
        tag.innerHTML = `${user.name}`;
        player_tags.append(tag);
    })
}

const setupTextField = () => {
    const body = document.querySelector('.content');
    const text_field = document.createElement('input');
    text_field.type = 'text';
    text_field.id = 'player_input';
    
    body.append(text_field);
}

const setupGame = (users) => {
    removeLobby();
    setupPlayerLabels(users);
    setupTextField();
}

export { setupGame };