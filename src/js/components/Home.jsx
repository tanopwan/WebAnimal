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
		//console.log("componentWillReceiveProps{Home}: props.errorObject: " + JSON.stringify(props.errorObject));
        console.log("componentWillReceiveProps{Home}: props: " + JSON.stringify(props));
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <ViewCaseContainer {...this.props}/>
            </div>
        );
    }
}
 
export default Home;