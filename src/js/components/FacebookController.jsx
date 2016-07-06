import React from 'react';
import userServices from '../services/user-services.js';
import { setError, onLogin, onLogout, onUnAuth, showModal, showLogin } from '../redux/actions'

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
            console.log("Getting login status...");
            if( res.status === "connected" ) {

                var accessToken = res.authResponse.accessToken;

                FB.api('/me', function(response) {
                    console.log( "Retrieved FB Profile from /me API: " + JSON.stringify(response) );
                    var userObject = {
                        fbId: response.id,
                        username: response.name
                    }
                    userServices.userLogin(userObject, accessToken).then(function(res) {
                        if (res.code == 200) {
                            dispatch(onLogin(Object.assign(res.object, {accessToken: accessToken})));
                        }
                        else {
                            dispatch(onLogout());
                            dispatch(setError(res));
                            dispatch(showModal("Server Error", "ไม่สามารถ Log in กับ server ได้ไม่พบ user ในฐานข้อมูล"));
                        }
                    }, function(res) {
                        if (res.status == 401) {
                            // Unauthorized
                            // res {readyState: 4, responseText: "Unauthorized", status: 401, statusText: "Unauthorized"}
                            dispatch(onUnAuth());
                            dispatch(showModal("Unauthorized", "ไม่สามารถ Log in กับ server ได้ AccessToken ไม่ถูกต้อง"));
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
            FB.Event.subscribe('auth.statusChange', getUserProfile);
        });
    }

    render() {
        return ( <span /> );
    }
};

FacebookController.contextTypes = {
    store: React.PropTypes.object
}
