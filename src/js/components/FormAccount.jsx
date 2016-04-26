import React from 'react';
import InputText from './InputText.jsx';
import SaveButton from './SaveButton.jsx';

class FormAccount extends React.Component {
    render() {
        return (
        	<div>
	            <div className="row">
	            	<div className="col-xs-8">
	            		<InputText name="" display_name="ชื่อ" value={this.props.fbValue} />
	            	</div>
	            </div>
	            <div className="row">
	            	<div className="col-xs-8">
	            		<SaveButton />
	            	</div>
	            </div>
            </div>
        );
    }
}
 
export default FormAccount;