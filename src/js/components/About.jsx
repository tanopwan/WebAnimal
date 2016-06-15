import React from 'react';
import CasePanel from './CasePanel.jsx'
import FormComment from './FormComment.jsx'
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
        console.log("componentDidMount{About}");
        CaseServices.getCases().then(function(res) {
            console.log("getCases...");
            console.log(res);
            if (res.code == 200) {
                self.setState({items: res.object});
            }
            else {
                console.log(res);
            }
        });
    }

    render() {
        return (
            <div>
                <div className="col-xs-12">
                    <FormComment/>
                </div>
                <div className="col-xs-8">
	                {this.state.items.map((item) => (
	                   <CasePanel key={item._id} item={item} />
	                ))}
	            </div>
            </div>
        );
    }
}
 
export default About;