import React from 'react';
import FormAddNewCase from './FormAddNewCase.jsx';

class AddNewCase extends React.Component {

    componentWillReceiveProps(props) {
        //console.log("componentWillReceiveProps{AddNewCase}: " + JSON.stringify(props));
    }

    componentDidMount() {
        //console.log("componentDidMount{AddNewCase}: " + JSON.stringify(this.props));
    }

    render() {
        return (
            <div>
                <div className="col-xs-8">
                	<center><h4>Add new case</h4></center>
                	<FormAddNewCase {...this.props}/>
                </div>
            </div>
            
        );
    }
}
 
export default AddNewCase;