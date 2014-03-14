(function() {
    if(typeof(SU) == "undefined")
        SU = {};
    SU.Cookie = function(name, value) {
        this.name    = name;
        this.value   = value;
        this.expires = null;
        this.path    = '/';

        // Use the TLD by default, this matches the PHP behavior
        this.domain = document.location.host.replace(/[^\.]*/, '');

        //not implemented
        this.secure = false;

        this.setExpirationSeconds = function(seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (1000 * seconds));
            this.expires = date;
        };

        this.setExpirationHours = function(hours) {
            this.setExpirationSeconds(hours * 3600);
        };

        this.setExpirationDays = function(days) {
            this.setExpirationSeconds(days * 86400);
        };

        this.setDomain = function(domain) {
            this.domain = domain;
        };

        this.save = function() {
            var curCookie   = this.name + '=' + escape(this.value) +
                ((this.expires) ? '; expires=' + this.expires.toGMTString() : '') +
                ((this.path) ? '; path=' + this.path : '') +
                ((this.domain) ? '; domain=' + this.domain : '') +
                ((this.secure) ? '; secure' : '');
            document.cookie = curCookie;
        }

        this.read = function() {
            var nameEQ = this.name + "=";
            var ca     = document.cookie.split(';');
            for(var i = 0 ; i < ca.length ; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    this.value = unescape(c.substring(nameEQ.length,c.length));
                }
            }
            return this.value;
        };

        this.setValue = function(value) {
            this.value = value;
        };

        this.kill = function() {
            this.setExpirationSeconds(-86400);
            this.value = null;
            this.save();
        };
    };
}).call(this);
