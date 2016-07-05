import React from 'react';

import userServices from '../services/user-services.js';
//import InputText from './InputText.jsx';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

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
		event.preventDefault();
		var postUser = {
			fbId: this.props.userObject.fbId,
			username: this.state.form.username
		};

		userServices.saveUser(postUser).then(function(resolve) {
			console.log(resolve);
		});
	}

	handleUsernameChange(event) {
        this.setState({form: {
        	username: event.target.value
        }});
    }

    render() {
        return (
            <Form horizontal onSubmit={(event) => { return handleSubmit(event, this.context.store) }}>
			    <FormGroup controlId="formHorizontalUsername">
			    	<Col componentClass={ControlLabel} sm={2}>
			        	ชื่อ
			      	</Col>
			      	<Col sm={10}>
			        	<FormControl type="static" />
			      	</Col>
			    </FormGroup>

			    <FormGroup controlId="formHorizontalEmail">
				    <Col componentClass={ControlLabel} sm={2}>
				        อีเมล์
				    </Col>
				    <Col sm={10}>
				        <FormControl type="email" placeholder="Email" />
				    </Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalMobile">
				    <Col componentClass={ControlLabel} sm={2}>
				        มือถือ
				    </Col>
				    <Col sm={10}>
				        <FormControl type="text" placeholder="Mobile" />
				    </Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalLine">
				    <Col componentClass={ControlLabel} sm={2}>
				        Line ID
				    </Col>
				    <Col sm={10}>
				        <FormControl type="text" placeholder="Line ID" />
				    </Col>
				</FormGroup>
			</Form>
        );
    }
}

FormAccount.contextTypes = {
    store: React.PropTypes.object
}


export default FormAccount;