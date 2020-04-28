const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

/* Keep track of all the messages in an array */
const all_messages = [];

const array = [20, 0, 40, 80, 30, 90, 100, 105];

const findBiggestGap = (array) => {

    let biggest_gap = 0;
    let min_value = 0;
    let max_value = 0;


    array.sort((a, b) => a - b);

    for (let i = 0; i < array.length - 1; i++) {
        if (array[i + 1] - array[i] > biggest_gap) {
            biggest_gap = array[i + 1] - array[i];
            min_value = array[i];
            max_value = array[i + 1];
        }
    }

    console.log(biggest_gap)
    console.log(min_value)
    console.log(max_value)
}

const formatMessage = (message) => {
    return {
        message,
        top: randomNumber(0, 100),
        left: randomNumber(0, 100)
    }
}

const spawnMessage = (message) => {
    const area = document.getElementById('play_area');

    all_messages.push(message);

    console.log(area.offsetWidth);
    console.log(area.offsetHeight);

    // const x_pos = area
}

export { formatMessage, spawnMessage }