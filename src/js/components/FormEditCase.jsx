import React from 'react';
import FormCase from './FormCase.jsx'
import CaseServices from '../services/case-services.js';

class FormEditCase extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			item: {}
		};
	}

	componentWillReceiveProps(props) {
    }

    componentDidMount() {
        console.log("componentDidMount{FormEditCase} : getCase with case_id: " + this.props.params.id);
        
        var case_id = this.props.params.id;
        var self = this;
        CaseServices.getCase(case_id).then(function(res) {
            console.log("return from CaseServices.getCase: " + JSON.stringify(res));
            if (res.code == 200) {
                self.setState({item: res.object}, function() {
                    //console.log(self.state);
                });
            }
        });
    }

	handleSubmit(event) {
		event.preventDefault();
		if (event.target) {
			var self = this;
	        CaseServices.updateCase(event.target, this.props.userObject.userId, "").then(function(res) {
	            console.log("return from CaseServices.updateCase: " + JSON.stringify(res));
	            if (res.code == 200) {
	                
	            }
	        });
		}
	}

    render() {
        return (
        	<div className="col-xs-8">
        		<FormCase item={this.state.item} handleSubmit={this.handleSubmit.bind(this)}/>
        	</div>
        );
    }
}


export default FormEditCase;