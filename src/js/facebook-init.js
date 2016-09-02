
var debug = true;

const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const appLog = (message) => {
    if (debug) {
        console.log(message);
    }
}

class FBModule {
    constructor() {
        this.FB = null;
        this.targets = [];
    }

    setFB(FB) {
        this.FB = FB;
        this.publish();
    }

    subscribe(target) {
        this.targets.push(target);

        if (this.FB) {
            target(FB);
        }
    }

    publish() {
        this.targets.map(value => {
            value(this.FB)
        });
    }
}

export let fbModule = new FBModule();

if (typeof(window) != 'undefined') {
    console.log("facebook-init.js - client init");
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1669516483298849',
            status     : true,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.6'
        });

        appLog("facebook-init.js - FB SDK Loaded");
        fbModule.setFB(FB);
    };

    (function(d, s, id){
        appLog("facebook-init.js - FB SDK Loading...");
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}
