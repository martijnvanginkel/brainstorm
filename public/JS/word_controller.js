const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}

/* Keep track of all the messages in an array */
const all_words = [];

const findWordById = (id) => (word) => word.id === id;

export const formatWord = (word) => {
    return {
        id: word._id,
        value: word.value,
        top: randomNumber(0, 100),
        left: randomNumber(0, 100)
    }
}

let el = null;

const onMouseDown = (e) => {

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    let prev_x = e.clientX;
    let prev_y = e.clientY;

    function mouseMove(e) {
        let new_x = prev_x - e.clientX;
        let new_y = prev_y - e.clientY;

        const rect = el.getBoundingClientRect();

        el.style.left = rect.left - new_x + "px";
        el.style.top = rect.top - new_y + "px";

        prev_x = e.clientX;
        prev_y = e.clientY;
    }
    // const parent = el.target.parentElement.getBoundingClientRect();

    // function mouseMove (e) {
    //     let cur_x = e.clientX;
    //     let cur_y = e.clientY;

    //     let new_x = cur_x / parent.width;
    //     let new_y = cur_y / parent.height;



    //     el.target.style.left = `${new_x * 100}%`;
    //     el.target.style.top = `${new_y * 100}%`;
    //     console.log(new_x, new_y)

    // }

    function mouseUp () {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
    }
}

export const spawnWord = async (word) => {
    const area = document.getElementById('play_area');
    const element = document.createElement('span');

    all_words.push(word);
    element.innerHTML = `${word.value}`;
    element.setAttribute("word_id", `${word.id}`);
    element.setAttribute("style", `
        position: absolute; 
        left: 0px;
        top: 0px;
        background-color: red;
    `);
    el = element;
    element.addEventListener('mousedown', onMouseDown);
    area.append(element);
}


