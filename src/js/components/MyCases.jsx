import React from 'react';
import CaseDetail from './CaseDetail.jsx'

class MyCases extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(props) {
    }

    componentDidMount() {
    }
    /*<CaseDetail case_id="573d85c369981eaa77f5a620"/>*/
    render() {
        return (
            <div>
                
                {this.props.children}
            </div>
        );
    }
}
 
export default MyCases;