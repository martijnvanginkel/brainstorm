const socket = io();

socket.on('message', message => {
    console.log(message);
});


const chat_form = document.getElementById('chat_form');

chat_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.chat_input.value;
    
    socket.emit('chat_message', message);
})