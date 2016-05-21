import React from 'react';
import ViewCaseContainer from './ViewCaseContainer.jsx';

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			err: 0
		}
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{Home}: props.errorObject" + JSON.stringify(props.errorObject));
        console.log("componentWillReceiveProps{Home}: props" + JSON.stringify(props));
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
                {(function(error, self) {
		         	if (error == 1) {
		            	return (<div className="alert alert-danger">
	            					{JSON.stringify(self.props.errorObject)}
	            				</div>);
		          	}
		        })(this.state.err, this)}
                <ViewCaseContainer />
            </div>
        );
    }
}
 
export default Home;