const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

/* Keep track of all the messages in an array */
const all_words = [];

export const formatWord = (word) => {
    return {
        id: word._id,
        value: word.value,
        top: randomNumber(0, 100),
        left: randomNumber(0, 100)
    }
}

const onMouseDown = (e) => {
    
    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseup', mouseUp);

    const moveMouse = (e) => {

    }

    const mouseUp = () => {

    }
}

export const spawnWord = async (word) => {
    const area = document.getElementById('play_area');
    const element = document.createElement('span');

    all_words.push(word);
    element.innerHTML = `${word.value}`;
    element.setAttribute("style", `
        position: absolute; 
        left: ${word.left}%;
        top: ${word.top}%;
        background-color: red;
    `);
    element.addEventListener('mousedown', onMouseDown);


    area.append(element);
}


