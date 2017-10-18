Module.register("MMM-CFB", {
    // Default module config
    defaults: {
        text: "Hello World!"
    },

    getStyles: function() {
        return ["MMM-CFB.css"];
    },

    start: function() {
        this.getGames();
        this.scheduleUpdate();
    },

    // Override dom generator
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        var list = document.createElement("ul");
        var data = this.result;

        if(Object.keys(data).length === 0 && data.constructor === Object){
            return wrapper;
        }
        var count =  data.count;
        console.log(count)

        for(var i = 0; i < count; i++) {
            var gameData = data[i];
        }
        return wrapper;
    },

    scheduleUpdate: function(delay) {
        var loadTime = this.config.updateInterval;
        if(typeof delay !== "undefined" && delay >= 0) {
            loadTime = delay;
        }

        var that = this;
        setInterval(function() {
            that.getGames();
        }, loadTime);
    },

    getGames: function() {
        var url = "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?limit=25";
        this.sendSocketNotification('GET_GAMES', url);
    },

    socketNotificationReceived: function(notification, payload) {
          this.result = payload;
          this.updateDom(self.config.fadeSpeed);
    }

});