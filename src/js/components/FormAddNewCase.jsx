import React from 'react';
import { connect } from 'react-redux'

import FormCase from './FormCase.jsx'
import CaseServices from '../services/case-services.js';
import { setError, SET_ERROR, ErrorTypes } from '../redux/actions'

class FormAddNewCase extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormAddNewCase}: " + JSON.stringify(props));
    }

    componentDidMount() {
    	console.log("componentDidMount{FormAddNewCase}: " + JSON.stringify(this.props));
    	console.log(this.context.store);
    }

	handleSubmit(event) {
		event.preventDefault();
		this.context.store.dispatch(setError(ErrorTypes.ERR_FORM_INVALID, "goofy"));
		/*if (event.target) {
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
		}*/
	}

    render() {
        return (
        	<FormCase handleSubmit={this.handleSubmit.bind(this)} userObject={this.props.userObject}/>
        );
    }
}

FormAddNewCase.contextTypes = {
    store: React.PropTypes.object
}

//FormAddNewCase = connect()(FormAddNewCase)

export default FormAddNewCase;