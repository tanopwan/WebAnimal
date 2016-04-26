import React from 'react';
 
class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        console.log("SaveButton contructor");
        this.state = {};
    }


    render() {
        return (
        	<div className="form-group">
				<input type="submit" className="btn btn-success" value="Save"/>
			</div>
        );
    }
}
 
export default SaveButton;