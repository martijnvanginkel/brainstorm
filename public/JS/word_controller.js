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

const onMouseDown = (el) => {

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    const element = all_words.find(findWordById(el.target.getAttribute('word_id')));
    // console.log(element);

    // let prev_y = el.clientY;
    
    // const start_top = element.top;
    // const start_left = element.left;

    // const parent_height = el.target.parentElement.clientHeight;
    // const parent_width = el.target.parentElement.clientWidth;

    // console.log(parent_height);
    // console.log(start_top)

    // console.log(el.target);
    // console.log(el.target.parentElement.clientWidth);
    // console.log(el.target.parentElement.clientHeight);

    // console.log(el);

    const parent = el.target.parentElement.getBoundingClientRect();

    function mouseMove (e) {
        let cur_x = e.clientX;
        let cur_y = e.clientY;


        // console.log(parent)
        let new_x = (cur_x / parent.width) * 100;
        let new_y = (cur_y / parent.height) * 100;


        el.target.style.left = `${new_x}%`;
        el.target.style.top = `${new_y}%`;
        console.log(new_x, new_y)
        // console.log(element);
        // console.log(e.target);
        // console.log(e.target.style.left);


    }

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
        left: ${word.left}%;
        top: ${word.top}%;
        background-color: red;
    `);
    element.addEventListener('mousedown', onMouseDown);
    area.append(element);
}


