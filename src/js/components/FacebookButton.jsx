import React from 'react';
import userServices from '../services/user-services.js';
import { setError, onLogin, showModal, SET_ERROR, ErrorTypes } from '../redux/actions'

export default class FacebookButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("componentDidMount{FacebookButton}");
        var that = this;
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1669516483298849',
                status     : true,
                cookie     : true,
                xfbml      : true,
                oauth      : true,
                version    : 'v2.6'
            });

            that.init();
        };

        (function(d, s, id){
            console.log("Load FB SDK");
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    componentDidUnMount() {
        this.FB.Event.unsubscribe('auth.logout', this.onLogout);
        this.FB.Event.unsubscribe('auth.statusChange', this.onStatusChange);
    }

    onStatusChange(response) {
        this.getUserProfile(response);
    }

    onLogout(response) {
        
    }

    init() {
        this.FB = FB;
        var self = this;
        const getUserProfile = (res) => {
            if( res.status === "connected" ) {

                var accessToken = res.authResponse.accessToken;

                self.FB.api('/me', function(response) {
                    console.log( "Retrieved FB Profile from /me API: " + JSON.stringify(response) );
                    var userObject = {
                        fbId: response.id,
                        username: response.name
                    }
                    userServices.userLogin(userObject, accessToken).then(function(res) {
                        if (res.code == 200) {
                            self.context.store.dispatch(onLogin(Object.assign(res.object, {accessToken: accessToken})));
                        }
                        else {
                            self.context.store.dispatch(setError(res));
                            self.context.store.dispatch(showModal("Server Error", "ไม่สามารถ Log in กับ server ได้ไม่พบ user ในฐานข้อมูล"));
                        }
                    }, function(res) {
                        if (res.status == 401) {
                            // Unauthorized
                            // res {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                            self.context.store.dispatch(showModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
                        }
                    })
                })
            }
        }

        const onLogout = (res) => {
            console.log("onLogout");
        }

        FB.Event.subscribe('auth.logout', onLogout);
        FB.Event.subscribe('auth.statusChange', getUserProfile);
    }

    render() {
        return (
        <div>
            <div
                className="fb-login-button"
                data-max-rows="0"
                data-size="xlarge"
                data-show-faces="false"
                data-auto-logout-link="true"
            ></div>
            <div>{this.context.store.getState().message}</div>
        </div>
        );
    }
};

FacebookButton.contextTypes = {
    store: React.PropTypes.object
}