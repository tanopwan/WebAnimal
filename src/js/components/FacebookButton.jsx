import React from 'react';
import userServices from '../services/userServices.js';


export default class FacebookButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        };
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1669516483298849',
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

        this.FB = FB;
        this.FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
        this.FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));
    }

    onStatusChange(response) {
        var self = this;
        if( response.status === "connected" ) {
            this.FB.api('/me', function(response) {
                console.log( "Component{FacebookButton} [onStatusChange] " + JSON.stringify(response) );
                var message = "Welcome " + response.name;
                self.setState({
                    message: message
                });
                userServices.addUser(response).then(function(res) {
                    console.log(res);
                    self.props.onLogin(res);

                })
            })
        }
    }

    onLogout(response) {
        this.setState({
            message: ""
        });
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