const socket =io('http://localhost:8000');

const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer =  document.querySelector(".container");

const append = (message,position)=> {
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message =  messageInput.ariaValueMax;
    append(`you : ${message}` , `right`);
    socket.emit('send', message);
    messageInput.value='';
})

const name = prompt("ENTER YOUR NAME TO JOIN");
socket.emit('new-user-joined', name);


socket.on('user-joined', name => {
    append(`${name} Joioned The Chat`);
})

socket.on(`receive`, data =>{
    append(`${data.name}:${data.message}`,'right');
})