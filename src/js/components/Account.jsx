import React from 'react';
import FormAccount from './FormAccount.jsx';
import Counter from './Counter.jsx';

class Account extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			err: 0
		}
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{Account}: props.errorObject" + JSON.stringify(props.errorObject));
        console.log("componentWillReceiveProps{Account}: props" + JSON.stringify(props));
        if (props.errorObject != null) {
        	this.setState({err: 1});
        } else {
        	this.setState({err: 0});
        }
    }

    componentDidMount() {
    	if (this.props.errorObject != null) {
        	this.setState({err: 1});
        } else {
        	this.setState({err: 0});
        }
    }

    render() {
        return (
        	<div>
	            <div className="page-header">
	                <h4>A C C O U N T</h4>
	                {(function(error, self) {
			         	if (error == 1) {
			            	return (<div className="alert alert-danger">
		            					{JSON.stringify(self.props.errorObject)}
		            				</div>);
			          	}
		        	})(this.state.err, this)}
	            </div>
	            <FormAccount userObject={this.props.userObject}/>
            </div>
        );
    }
}

Account.propTypes = {
 	userObject: React.PropTypes.object,
 	errorObject: React.PropTypes.object
}

Account.defaultProps = {
	userObject: {
		fbId: "",
        username: ""
	},
	errorObject: {}
}
 
export default Account;