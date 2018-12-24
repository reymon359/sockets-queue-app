const fs = require('fs');

class TicketControl {

    constructor() {

        this.last = 0; // Last ticket i gave
        this.today = new Date().getDate();

        let data = require('../data/data.json');
        // Every new day I will restart the queue system
        // If the day of the data is the same as today we continue where the data ended

        if (data.today === this.today) {

            this.last = data.last;

        } else {

            this.restartCount();

        }
    }

    next() {

        this.last += 1;
        this.saveFile();

        return `Ticket ${this.last}`

    }


    getLastTicket() {
        return `Ticket ${this.last}`

    }

    restartCount() {

        this.last = 0;
        console.log('System has been initialized');

        this.saveFile();

    }

    saveFile() {

        let jsonData = {
            last: this.last,
            today: this.today
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}


module.exports = {
    TicketControl
}