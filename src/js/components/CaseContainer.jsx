import React from 'react';
import CaseCard from './CaseCard.jsx';
import CaseServices from '../services/case-services.js';

class CaseContainer extends React.Component {

	constructor(props) {
		super(props);

        this.state = {
            objects: []
        }
	}

    componentWillReceiveProps(props) {
        var self = this;
        CaseServices.getCases(props.filters).then(function(res) {
            if (res.code == 200) {
                self.setState({objects: res.object});
            }
        });
    }

    render() {
        return (
            <div className="col-xs-12">
                {this.state.objects.map(function(item) {
                    return <CaseCard key={item._id} item={item} />
                })}
            </div>
        );
    }
}
 
export default CaseContainer;