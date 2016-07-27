import React from 'react';
import { connect } from 'react-redux'

import CaseServices from '../services/case-services.js';
import * as Actions from '../redux/actions'

class CaseDetailInternal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log("componentWillMount: " + JSON.stringify(this.props));
		console.log(this.props.getDetail());
		this.props.getDetail();
	}

	compoenentWillReceiveProps() {
		console.log("compoenentWillReceiveProps: " + JSON.stringify(this.props));
		console.log(this.props.getDetail());
	}

	render() {
        return (
			<div>
				<h4>เจ้าของเคส {this.props.username}</h4>
				<h5>{this.props.caseName}</h5>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
    return {
		username: state.viewCase.username,
		caseName: state.viewCase.casename
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDetail: () => {
			CaseServices.getCase(ownProps.params.id).then(function(result) {
				console.log(result);
				dispatch(Actions.onGetCaseDetail(result));
			}, function(error) {
				console.log(error);
				dispatch(Actions.showWarningModal("ผิดพลาด", "ไม่สามารถแสดงรายละเอียดเคสได้"));
			});
		}
    }
}

const CaseDetail = connect(
	mapStateToProps,
	mapDispatchToProps
)(CaseDetailInternal);

export default CaseDetail;
