import React from 'react';
import CasePanel from './CasePanel.jsx'
import CaseServices from '../services/case-services.js';

class About extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: []
		}
	}

	componentDidMount() {
        var self = this;
        CaseServices.getCases().then(function(res) {
            if (res.code == 200) {
                self.setState({items: res.object});
            }
        });
    }

    render() {
        return (
            <div>
                <div className="col-xs-12">
	                {this.state.items.map(function(item) {
	                    return <CasePanel key={item._id} item={item} />
	                })}
	            </div>
            </div>
        );
    }
}
 
export default About;