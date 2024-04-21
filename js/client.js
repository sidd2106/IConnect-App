const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('join.mp3');
var audio1 = new Audio('leave.mp3');
var audio2 = new Audio('message.mp3');


const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio2.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('message-send',message);
    messageInput.value = '';
})

const Name = prompt("Enter your name to join");
socket.emit('new-user-joined', Name);

socket.on('user-joined',Name=>{
    append(`${Name} joined the chat`, 'right');
    audio.play();
})

socket.on('receive',data=>{
    append(`${data.Name}: ${data.message}`, 'left');
})

socket.on('left', Name=>{
    append(`${Name} left the chat`, 'left');
    audio1.play();
})


