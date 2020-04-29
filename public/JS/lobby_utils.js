
const filterOnlineUsers = (user) => user.in_game === true;

const findUserLabelById = (id) => (user) => user.id === id;

const updateProgressBar = (percentage) => {
    const bar = document.getElementById('progress_bar');
    bar.value = percentage;
}

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

const fetchRemoveUser = async (game_key, user_id) => {
    const response = await fetch(`http://localhost:5000/api/games/${game_key}/remove_user/${user_id}`, {
        method: 'PUT',
        body: {}
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        return data;
    });
    return response;
}

const removeUserFromLobby = async (game_key, user_id, user_labels) => {
    for (let i = 0; i < user_labels.length; i++) {
        if (user_labels[i].id == user_id) {
            await fetchRemoveUser(game_key, user_id);
            user_labels[i].removeElement();
            user_labels.splice(i, 1);
            return ;
        }    
    }
}

export { filterOnlineUsers, findUserLabelById, updateProgressBar, removeUserFromLobby, percentageOfUsersReady };