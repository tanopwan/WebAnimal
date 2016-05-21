import React from 'react';
import userServices from '../services/user-services.js';


export default class FacebookButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };
    }

    componentDidMount() {
        console.log("componentDidMount{FacebookButton}");
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1669516483298849',
                status     : true,
                cookie     : true,
                xfbml      : true,
                version    : 'v2.6'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        try {
            this.FB = FB;
            this.FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
            this.FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));
        }
        catch(err) {
            console.log("Could not connect to Facebook Server");
        }

    }

    onStatusChange(response) {
        this.getUserProfile(response);
    }

    onLogout(response) {
        this.setState({
            message: ""
        });
    }

    getUserProfile(res) {
        var self = this;
        if( res.status === "connected" ) {
            this.FB.api('/me', function(response) {
                console.log( "getUserProfile{FacebookButton}: " + JSON.stringify(response) );
                var message = "Welcome " + response.name;
                self.setState({
                    message: message
                });
                var userObject = {
                    fbId: response.id,
                    username: response.name
                }
                userServices.userLogin(userObject).then(function(res) {
                    self.props.onLogin(res);
                })
            })
        }
    }

    render() {
        return (
        <div>
            <div
                className="fb-login-button"
                data-max-rows="1"
                data-size="medium"
                data-show-faces="true"
                data-auto-logout-link="true"
            ></div>
            <div>{this.state.message}</div>
        </div>
        );
    }
};