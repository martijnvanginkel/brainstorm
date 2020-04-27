// import { fetchSetUserReady } from './game_users.js';

// const socket = io();

// const user_labels = [];



// class UserLabel {
//     constructor(id, name, is_me, lobby_ready) {
//         this.id = id;
//         this.name = name;
//         this.element = this.createElement(is_me, id, lobby_ready);
//         this.lobby_ready = lobby_ready;
//     }

//     addReadyButton(user_element) {
//         const ready_btn = document.createElement('button');
//         ready_btn.type = 'button';
//         ready_btn.id = 'ready_btn';
//         ready_btn.innerHTML = 'Ready';
//         ready_btn.addEventListener('click', async (e) => {

//             const game = await fetchSetUserReady(this.id);

//             console.log(game);
//             /*

//                 if all users are ready then lock the game and start the countdown for all users

//             */

//             e.target.disabled = true;
//             e.target.className = 'disable_hover'
//             // e.
//             console.log(e.target.parentElement);
//             e.target.parentElement.classList.add('ready_joined_user')
//             socket.emit('user_is_ready', this.id);
//         })
//         user_element.append(ready_btn);
//     }

//     createElement(is_me, user_id, lobby_ready) {
//         const parent = document.getElementById('joined_users');
//         const user_element = document.createElement('div');
    
//         user_element.className = 'joined_user';
//         user_element.innerHTML = `<span class="joined_user_name">${this.name}</span>`;

//         if (is_me) {
//             this.addReadyButton(user_element);
//         }
//         else {
//             const ready_el = document.createElement('span');
//             ready_el.className = 'ready_el';
//             ready_el.innerHTML = 'Not ready';
//             user_element.append(ready_el);
//             if (lobby_ready === true) {
//                 ready_el.innerHTML = 'Ready';
//                 user_element.classList.add('ready_joined_user');
//             }
//         }
//         parent.append(user_element);
//         user_labels.push(this);
//         return user_element;
//     }

//     setUserReady() {
//         this.element.querySelector('.ready_el').innerHTML = 'ready'
//         this.element.classList.add('ready_joined_user');
//     }

//     removeElement() {
//         this.element.remove();
//         user_labels.splice(this);
//     }
// }

// const findUserLabelById = (id) => {
//     return (user) => {
//         return user.id === id;
//     }
// }

// export { UserLabel, user_labels, findUserLabelById }
