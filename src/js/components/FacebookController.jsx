import React from 'react';
import userServices from '../services/user-services.js';
import { setError, onLogin, onLogout, onAuth, onUnAuth, showWarningModal, showLogin } from '../redux/actions'

export default class FacebookController extends React.Component {
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
                version    : 'v2.6'
            });

            that.init();
            console.log("FB SDK Loaded");
        };

        (function(d, s, id){
            console.log("FB SDK Loading...");
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    init() {
        var dispatch = this.context.store.dispatch;
        const getUserProfile = (res) => {
            console.log("Getting FB login status...");
            if( res.status === "connected" ) {
                //res.authResponse{accessToken: "...", userID: "1199019910116181", expiresIn: 6744, signedRequest: "..."
                var accessToken = res.authResponse.accessToken;
                dispatch(onAuth(res.authResponse.userID, accessToken));

                FB.api('/me', function(response) {
                    console.log( "Getting FB login status...Logged in - Retrieved FB Profile from /me API: " + JSON.stringify(response) );
                    var userObject = {
                        fbId: response.id,
                        username: response.name
                    }
                    console.log( "Getting WebAnimal login status..." );
                    userServices.userLoginStatus(userObject, accessToken).then(function(res) {
                        console.log( "Getting WebAnimal login status... - " + JSON.stringify(res) );
                        //res: {code: 0, message: "user.js - updateUserOnLogin success", object: {fbId, username, userId, lastLogin}}
                        if (res.code == 0 && res.object) {
                            // Log in
                            var userId = res.object.userId;
                            var lastLogin = res.object.lastLogin;
                            dispatch(onLogin(Object.assign({}, res.object, {accessToken, userId, lastLogin})));
                        }
                        else if (res.code == 1) {
                            // Not log in
                            dispatch(showLogin());
                        }
                    }, function(res) {
                        // {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                        if (res.status == 401) {
                            // Unauthorized
                            // res {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                            dispatch(onUnAuth());
                            dispatch(showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
                        }
                        //{readyState: 4, responseText: "{"code":1001,"message":"Invalid parameters"}", responseJSON: Object, status: 400, statusText: "Bad Request"}
                        else if (res.status == 400) {
                            dispatch(onUnAuth());
                            dispatch(showWarningModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้, " + res.responseText));
                        }
                    })
                })
            }
            else if (res.status === 'not_authorized') {
                console.log('User is not authorized to WebAnimal App');
                dispatch(showLogin());
            } else {
                console.log('User is not logged into Facebook');
                dispatch(showLogin());
            }
        }

        // Call every time
        FB.getLoginStatus(function (res) {
            getUserProfile(res);
            //FB.Event.subscribe('auth.statusChange', getUserProfile);
        });
    }

    render() {
        return ( <span /> );
    }
};

FacebookController.contextTypes = {
    store: React.PropTypes.object
}
