// Set connection with server
var socket = io();

var label = $('#lblNewTicket');

// var label = document.getElementById('lblNewTicket');

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from the server');
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});

// document.getElementsByClassName("btn")[0].addEventListener("click", function() {
//     socket.emit('nextTicket', null, function(nextTicket) {
//         label.innerHTML = nextTicket;
//     });
// });