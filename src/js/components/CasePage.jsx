import React from 'react';

class CasePage extends React.Component {

	constructor(props) {
		super(props);

	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{CasePage}: " + JSON.stringify(props.userObject));
    }

    componentDidMount() {
        console.log("componentDidMount{CasePage}");
    }

    render() {
        return (
            <div>
                <h3>Case Page</h3>
                {React.cloneElement(this.props.children, { userObject: "this.props.userObject"})}
            </div>
        );
    }
}

CasePage.propTypes = {
    userObject: React.PropTypes.object
}

CasePage.defaultProps = {
    userObject: {}
}

export default CasePage;