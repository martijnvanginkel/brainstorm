import { fetchSetUserReady, userPressedReady } from './browser_sockets.js';

const user_labels = [];

const filterOnlineUsers = (user) => user.in_game === true;

const percentageOfUsersReady = (users) => {
    users = users.filter(filterOnlineUsers);
    let total = users.length;
    let count = 0;
    for (let i = 0; i < users.length; i++) {
        if (users[i].lobby_ready === true) {
            count++;
        }
    }
    if (count === 0) {
        return 0;
    }
    return (count / total) * 100;
}

class UserLabel {
    constructor(id, name, is_me, lobby_ready) {
        this.id = id;
        this.name = name;
        this.is_me = is_me;
        this.element = this.createElement(is_me, lobby_ready);
        this.lobby_ready = lobby_ready;
    }

    addReadyButton(user_element) {
        const ready_btn = document.createElement('button');
        ready_btn.type = 'button';
        ready_btn.id = 'ready_btn';
        ready_btn.innerHTML = 'Ready';
        ready_btn.addEventListener('click', async (e) => {
            const game = await fetchSetUserReady(this.id);
            const percentage = percentageOfUsersReady(game.users);
            const subject = document.getElementById('game_subject').value;

            e.target.disabled = true;
            e.target.className = 'disable_hover';
            e.target.parentElement.classList.add('ready_joined_user');
            userPressedReady(this.id, percentage, subject);
        })
        user_element.append(ready_btn);
    }

    addReadyText(user_element, lobby_ready) {
        const ready_el = document.createElement('span');
        ready_el.className = 'ready_el';
        ready_el.innerHTML = 'Not ready';
        user_element.append(ready_el);
        if (lobby_ready === true) {
            ready_el.innerHTML = 'Ready';
            user_element.classList.add('ready_joined_user');
        }
    }

    createElement(is_me, lobby_ready) {
        const parent = document.getElementById('joined_users');
        const user_element = document.createElement('div');
    
        user_element.className = 'joined_user';
        user_element.innerHTML = `<span class="joined_user_name">${this.name}</span>`;
        if (is_me) {
            this.addReadyButton(user_element);
        }
        else {
            this.addReadyText(user_element, lobby_ready);
        }
        parent.append(user_element);
        user_labels.push(this);
        return user_element;
    }

    setUserReady() {
        this.element.querySelector('.ready_el').innerHTML = 'Ready'
        this.element.classList.add('ready_joined_user');
    }

    setUserUnready() {
        if (this.is_me === true) {
            console.log('me');
            const ready_btn = document.getElementById('ready_btn');
            ready_btn.disabled = false;
            ready_btn.className = '';
        }
        else {
            console.log('not me');
            const el = this.element.querySelector('.ready_el');
            el.innerHTML = 'Not ready';
        }
    }

    removeElement() {
        this.element.remove();
    }
}

export { UserLabel, user_labels, percentageOfUsersReady }
