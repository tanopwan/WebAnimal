import React from 'react';
 
class InputText extends React.Component {
    render() {
        return (
        	<div className="form-group">
				<label className="control-label col-sm-2" htmlFor={this.props.name}>{this.props.display_name}</label>
				<div className="col-sm-10">
  					<input type="text" className="form-control" name={this.props.name}/>
  				</div>
			</div>
        );
    }
}
 
export default InputText;