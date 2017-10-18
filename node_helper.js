var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
    start: function() {
        console.lof(this.name + ' helper method started...');
    },

    sendRequest: function(url) {
        var self = this;

        request({ url: url, method: 'GET' }, function(error, response, body) {
            if(!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                

                self.sendSocketNotification('GAMES_RESULT', result.competitions);
            }
        })
    },

    //Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, url) {
        if (notification === 'GET_GAMES') {
            //console.log(url)
            this.sendRequest(url);
        }
    }
});