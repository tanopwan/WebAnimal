import React from 'react';
import ViewCaseContainer from './ViewCaseContainer.jsx';
import CaseServices from '../services/case-services.js';

class CaseDetail extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            item : {
                user: {},
                caseName: ""    
            }
        }
	}

	componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps{CaseDetail}: " + JSON.stringify(props));
    }

    componentDidMount() {
        //console.log("componentDidMount{CaseDetail} : getCase with case_id: " + this.props.case_id);
        console.log("componentDidMount{CaseDetail} : getCase with case_id: " + this.props.params.id);
        
        var case_id = this.props.params.id;
        var self = this;
        CaseServices.getCase(case_id).then(function(res) {
            console.log("return from CaseServices.getCase: " + JSON.stringify(res));
            if (res.code == 200) {
                self.setState({item: res.object}, function() {
                    //console.log(self.state);
                });
            }
        });
    }

    render() {
        return (
            <div>
                <h4>เจ้าของเคส {this.state.item.user.username}</h4>
                <h5>{this.state.item.caseName}</h5>
            </div>
        );
    }
}

CaseDetail.defaultProps = {
}
 
export default CaseDetail;