const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let next = ticketControl.next();
        callback(next);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        last4: ticketControl.getLast4()
    });

    client.on('attendTicket', (data, callback) => {
        // Check if the desk came back from callback
        if (!data.desk) {
            return callback({
                err: true,
                message: 'The desk is required'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);

        callback(attendTicket);

        // Update the last 4 tickets in the public window
        client.broadcast.emit('last4', {
            last4: ticketControl.getLast4()
        });



    });


});