import React from 'react';
import FormAddNewCase from './FormAddNewCase.jsx';
import CaseCard from './CaseCard.jsx';

class AddNewCase extends React.Component {
    render() {
        return (
            <div>
                <div className="col-xs-8">
                	<center><h4>Add new case</h4></center>
                	<FormAddNewCase userObject={this.props.userObject}/>
                </div>
                <div className="col-xs-4">
                	<CaseCard />
                </div>
            </div>
            
        );
    }
}

AddNewCase.defaultProps = {
    userObject: {
        fbId: "",
        username: ""
    }
}
 
export default AddNewCase;