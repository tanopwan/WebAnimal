import React from 'react';
import { connect } from 'react-redux'

import CaseServices from '../services/case-services.js';
import * as Actions from '../redux/actions'

class CaseDetailInternal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.props.mount().then((result) => {
			this.setState(result);
		})
	}

	componentWillUnmount() {
		this.props.unmount();
	}

	render() {
        return (
			<div>
				<h4>เจ้าของเคส {this.state.username}</h4>
				<h5>{this.state.caseName}</h5>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
    return { }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		mount: () => {
			return CaseServices.getCase(ownProps.params.id).then(function(result) {
				if (result.code == 0) {
					return result.object;
				}
			}, function(error) {
				console.log(error);
				dispatch(Actions.showWarningModal("ผิดพลาด", "ไม่สามารถแสดงรายละเอียดเคสได้"));
			})
		},
		unmount: () => {}
    }
}

const CaseDetail = connect(
	mapStateToProps,
	mapDispatchToProps
)(CaseDetailInternal);

export default CaseDetail;
