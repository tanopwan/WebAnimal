import React from 'react';
import CaseCard from './CaseCard.jsx';
import CaseServices from '../services/case-services.js';
import { Link } from 'react-router';

class CaseContainer extends React.Component {

	constructor(props) {
		super(props);

        this.state = {
            objects: []
        }
	}

    componentWillMount() {
        CaseServices.getCases(this.props.filters).then((res) => {
            if (res.code == 0) {
                this.setState({objects: res.object});
            }
        });
    }

    render() {
        return (
            <div className="col-xs-12">
                {this.state.objects.map(function(item) {
                    return <Link to={'/case/view/'+item.caseId} key={item.caseId}><CaseCard key={item.caseId} username={item.username} caseName={item.caseName} imagePath={item.imagePath} /></Link>
                })}
            </div>
        );
    }
}

export default CaseContainer;
