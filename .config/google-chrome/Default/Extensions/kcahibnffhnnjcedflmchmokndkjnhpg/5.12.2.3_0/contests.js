/**
 * contests.js
 *
 * Support for stumble discovery contests.
 *
 */
var Contests = {
    REFRESH_RATE: 3600000, // Every 1 hour

    _bp:          null,
    _contestUrl:  null,
    _contests:    [],

    getAll: function() {
        return this._contests;
    },

    getMenuItems: function(url) {
        var contest = this._getContest(url);
        if(!contest)
            return null;
        return contest.popupItems;
    },

    isContestUrl: function(url) {
        return this._getContest(url);
    },

    checkShowNotification: function(url) {
        var contest = this._getContest(url);
        if(!contest || !contest.notification)
            return;

        var shownNotifications = getStorage("shownNotifications");
        if(!shownNotifications)
            shownNotifications = {};

        var shown = shownNotifications[contest.id];
        if(shown) {
            if(shown.number > contest.notification.maxTimes)
                return;
            if((new Date()).getTime() - shown.last < contest.notification.pauseBetween*1000)
                return;
        } else {
            shownNotifications[contest.id] = shown = { number: 0 };
        }

        // Increment the value and update the notification data
        shown.last = (new Date()).getTime();
        shown.number++;
        setStorage("shownNotifications", shownNotifications);

        // And show the notification

        this._showNotification(contest.notification);
    },

    resetNotifications: function(contestId) {
        var shownNotifications = getStorage("shownNotifications");
        if(!shownNotifications)
            return;

        shownNotifications[contestId] = null;
        setStorage("shownNotifications", shownNotifications);
    },

    activate: function(contestId) {
        for(var i=0; i<this._contests.length; i++) {
            if(this._contests[i].id == contestId) {
                this._contests[i].active = true;
                return;
            }
        }
    },

    _showNotification: function(note) {
        // Create a simple text notification:
        var notification = null;
        if(note.url) {
            notification = webkitNotifications.createHTMLNotification(note.url);
        } else {
            notification = webkitNotifications.createNotification(
              note.icon,
              note.title,
              note.text
            );
        }
        notification.show();
    },

    _getContest: function(url) {
        for(var i=0; i<this._contests.length; i++) {
            var regex = new RegExp(this._contests[i].urlRegex);
            if(url.match(regex)) {
                if(this._contests[i].active)
                    return this._contests[i];
            }
        }
        return null;
    },

    _processContestData: function(text) {
        try {
            this._contests = JSON.parse(text);
        } catch(ex) {
            console.log("Invalid contests.json file.");
            this._contests = [];
        }
    },

    refresh: function(bp, contestUrl) {
        if(bp)
            this._bp = bp;
        if(contestUrl)
            this._contestUrl = contestUrl;

        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this._contestUrl, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4)
                self._processContestData(xhr.responseText);
        };
        xhr.send();
    },

    init: function(bp, contestUrl) {
        this._bp = bp;
        this._contestUrl = contestUrl;

        var self = this;
        window.setInterval(function() {
            self.refresh();
        }, this.REFRESH_RATE);

        this.refresh();
    }
}
