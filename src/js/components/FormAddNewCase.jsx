import React from 'react';
import FormCase from './FormCase.jsx'
import CaseServices from '../services/case-services.js';

class FormAddNewCase extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormAddNewCase}: " + JSON.stringify(props));
    }

    componentDidMount() {
    	console.log("componentDidMount{FormAddNewCase}: " + JSON.stringify(this.props));
    }

	handleSubmit(event) {
		event.preventDefault();
		if (event.target) {
			var self = this;
	        CaseServices.saveNewCase(event.target, this.props.userObject.userId).then(function(res) {
	            console.log("return from CaseServices.saveNewCase: " + JSON.stringify(res));
	            if (res.code == 200) {
	                this.props.resetError(res);
	            }
	            else {
	            	console.log("setError: " + this.props.setError);
	            	this.props.setError(res);
	            }
	        });
		}
	}

    render() {
        return (
        	<FormCase handleSubmit={this.handleSubmit.bind(this)} userObject={this.props.userObject}/>
        );
    }
}


export default FormAddNewCase;