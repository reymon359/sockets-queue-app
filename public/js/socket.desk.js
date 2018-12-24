// Set connection with server
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('The desk is required');
}

var desk = searchParams.get('desk');
var label = $('small');

$('h1').text('Desk: ' + desk);
// document.getElementsByTagName("h1")[0].innerHTML = 'Desk ' + desk;

$('button').on('click', function() {
    socket.emit('attendTicket', { desk: desk }, function(resp) {
        if (resp === 'There are no tickets') {
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.number)
    });
});