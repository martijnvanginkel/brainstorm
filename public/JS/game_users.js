// import { game_key } from './browser_sockets.js';

// const fetchAddUser = async (name) => {
//     const new_user = await fetch(`http://localhost:5000/api/games/${game_key}/add_user/${name}`, {
//         method: 'PUT',
//         body: {}
//     }).then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         return data;
//     });
//     return new_user;
// }

// const fetchRemoveUser = async (user_id) => {
//     const response = await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${user_id}`, {
//         method: 'PUT',
//         body: {}
//     }).then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         return data;
//     });
//     return response;
// }

// const fetchAllUsers = async () => {
//     const users = await fetch(`http://localhost:5000/api/games/${game_key}/get_users`, {
//         method: 'GET'
//     }).then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         return data;
//     });
//     return users;
// }

// const fetchSetUserReady = async (user_id) => {
//     const game = await fetch(`http://localhost:5000/api/games/${game_key}/set_user_ready/${user_id}`, {
//         method: 'PUT',
//         body: {}
//     }).then(function(response) {
//         return response.json();
//     }).then(function(data) {
//         return data;
//     });
//     return game;
// }

// export { fetchAddUser, fetchRemoveUser, fetchAllUsers, fetchSetUserReady }