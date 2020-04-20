const socket = io();

socket.on('message', message => {
    console.log(message);
});

console.log(window.location.href)

const url_string = window.location.href;


const url = new URL(url_string)
console.log(url.searchParams.get("name_field"));


const chat_form = document.getElementById('chat_form');

chat_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.chat_input.value;
    
    socket.emit('chat_message', message);
})