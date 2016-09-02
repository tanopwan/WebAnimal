import React from 'react';
import { connect } from 'react-redux'

const CasePagePresentational = ({children, routes, caseId}) => (
    <div className="col-xs-12">
        <span className="detail-header">
			case > view > {caseId}
		</span>
        {children}
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return {
		caseId: ownProps.params.id
	}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return { }
}

const CasePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CasePagePresentational);

export default CasePage;
