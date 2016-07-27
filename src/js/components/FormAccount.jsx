import React from 'react';

import { Form, Button, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

class FormAccount extends React.Component {

	constructor(props) {
		super(props);
		this.state = { };
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormAccount}: " + JSON.stringify(props));
    }

    componentWillMount() {
		console.log("componentWillMount{FormAccount}: " + JSON.stringify(this.props));
		this.setState({
			email: this.props.email,
			mobile: this.props.mobile,
			lineId: this.props.lineId
		})
    }

	handleSubmit(event) {
		event.preventDefault();
		this.props.updateUser(this.state.email, this.state.mobile, this.state.lineId);
	}

	handleEmailChange(event) {
        this.setState( {
        	email: event.target.value
        });
    }

    handleMobileChange(event) {
        this.setState( {
        	mobile: event.target.value
        });
    }

    handleLineIdChange(event) {
        this.setState( {
        	lineId: event.target.value
        });
    }

    render() {
        return (
            <Form horizontal onSubmit={(event) => { this.handleSubmit(event) }}>
			    <FormGroup controlId="formHorizontalUsername">
			    	<Col componentClass={ControlLabel} sm={2}>
			        	ชื่อ
			      	</Col>
			      	<Col sm={10}>
			        	<FormControl type="text" value={this.props.username} readOnly />
			      	</Col>
			    </FormGroup>

			    <FormGroup controlId="formHorizontalEmail">
				    <Col componentClass={ControlLabel} sm={2}>
				        อีเมล์
				    </Col>
				    <Col sm={10}>
				        <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} />
				    </Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalMobile">
				    <Col componentClass={ControlLabel} sm={2}>
				        มือถือ
				    </Col>
				    <Col sm={10}>
				        <FormControl type="text" placeholder="Mobile" value={this.state.mobile} onChange={this.handleMobileChange.bind(this)} />
				    </Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalLine">
				    <Col componentClass={ControlLabel} sm={2}>
				        Line ID
				    </Col>
				    <Col sm={10}>
				        <FormControl type="text" placeholder="Line ID" value={this.state.lineId} onChange={this.handleLineIdChange.bind(this)} />
				    </Col>
				</FormGroup>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-10">
						<Button bsStyle="info" type="submit">บันทึก</Button>
					</div>
				</div>
			</Form>
        );
    }
}

export default FormAccount;