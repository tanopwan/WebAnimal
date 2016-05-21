import React from 'react';

import userServices from '../services/user-services.js';
import InputText from './InputText.jsx';



class FormAccount extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormAccount}: " + JSON.stringify(props));
        this.setState({form: {
        	username: props.userObject.username
        }});
    }

	handleSubmit(event) {
		var postUser = {
			fbId: this.props.userObject.fbId,
			username: this.state.form.username
		};

		userServices.saveUser(postUser).then(function(resolve) {
			console.log("result");
			console.log(resolve);
		});

        event.preventDefault();
	}

	handleUsernameChange(event) {
        this.setState({form: {
        	username: event.target.value
        }});
    }

    render() {
        return (
        	<form id="userForm" onSubmit={this.handleSubmit.bind(this)}>
	            <div className="row">
	            	<div className="col-xs-8">
	            		<InputText name="username" display_name="ชื่อ" value={this.props.userObject.username} />
	            	</div>
	            </div>
	            <div className="row">
	            	<div className="col-xs-8">
	            		<button type="submit" className="btn btn-success">Save</button>
	            	</div>
	            </div>
            </form>
        );
    }
}


export default FormAccount;