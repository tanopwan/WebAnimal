import React from 'react';

class MyCases extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

MyCases.contextTypes = {
    store: React.PropTypes.object
}
 
export default MyCases;