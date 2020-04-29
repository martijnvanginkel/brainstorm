const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

/* Keep track of all the messages in an array */
const all_messages = [];

const left_array = [0, 100, randomNumber(0, 100)];
const top_array = [0, 100, randomNumber(0, 100)];

const formatMessage = (message) => {
    return {
        message,
        top: randomNumber(0, 100),
        left: randomNumber(0, 100)
    }
}

const spawnMessage = (message) => {
    const area = document.getElementById('play_area');
    const element = document.createElement('span');

    all_messages.push(message);
    element.innerHTML = `${message.message}`;
    element.setAttribute("style", `
        position: absolute; 
        left: ${message.left}%;
        top: ${message.top}%;
        background-color: red;
    `);

    area.append(element);
}

export { formatMessage, spawnMessage }