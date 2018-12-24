const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        console.log(next);
        callback(next);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket()
    });

});