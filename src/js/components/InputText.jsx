import React from 'react';
 
class InputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : ""
        };

        var self = this;
        this.handleChange = function(event) {
            self.setState({value: event.target.value});
        }
    }

    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps{InputText}: props" + JSON.stringify(props));
        this.setState({value: props.value});
    }

    componentDidMount() {
        console.log("componentDidMount{InputText}: this.props" + JSON.stringify(this.props));
        this.setState({value: this.props.value});
    }

    render() {
        return (
        	<div className="form-group">
				<label className="control-label col-sm-2" htmlFor={this.props.name}>{this.props.display_name}</label>
				<div className="col-sm-10">
  					<input type="text" className="form-control" name={this.props.name} value={this.state.value} onChange={this.handleChange} />
  				</div>
			</div>
        );
    }
}
 
export default InputText;