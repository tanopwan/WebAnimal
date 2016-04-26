import React from 'react';
import FormAccount from './FormAccount.jsx';

class Account extends React.Component {
    render() {
        return (
        	<div>
	            <div className="page-header">
	                <h4>A C C O U N T</h4>
	            </div>
	            <FormAccount fbValue={this.props.value} />
            </div>
        );
    }
}
 
export default Account;