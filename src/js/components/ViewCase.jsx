import React from 'react';
import { connect } from 'react-redux'

import * as Actions from '../redux/actions'
import CaseServices from '../services/case-services.js';

import CaseDetail from './CaseDetail.jsx'
import FormComment from './FormComment.jsx'
import CommentContainer from './CommentContainer.jsx'

const ViewCaseConnect = () => (
    <div>
        <div className="col-xs-12 col-sm-12 col-md-8">
            <CaseDetail />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4">
            <FormComment />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8">
            <CommentContainer />
        </div>
    </div>
)

const getCase = (caseId) => {
    return (dispatch, getState) => {
        CaseServices.getCase(caseId).then(function(result) {
            if (result.code == 0) {
                dispatch(Actions.onViewCase(result.object));
            }
            else {
                dispatch(Actions.showWarningModal("ไม่สามารถแสดงรายละเอียดเคสได้", result.message));
            }
        }, function(error) {
            dispatch(Actions.showWarningModal("ผิดพลาด", "ไม่สามารถแสดงรายละเอียดเคสได้"));
        })
    }
}

const getComments = (caseId, limit) => {
    return (dispatch, getState) => {
        CaseServices.getComments(caseId, limit).then(function(result) {
            if (result.code == 0) {
                dispatch(Actions.onViewComment(result.object));
            }
            else {
                dispatch(Actions.showWarningModal("ไม่สามารถแสดงรายละเอียดคอมเมนต์ได้", result.message));
            }
        }, function(error) {
            dispatch(Actions.showWarningModal("ผิดพลาด", "ไม่สามารถแสดงรายละเอียดคอมเมนต์ได้"));
        })
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    dispatch(getCase(ownProps.params.id));
    dispatch(getComments(ownProps.params.id, 20));
    return {}
}

const ViewCase = connect(mapStateToProps, mapDispatchToProps)(ViewCaseConnect);
export default ViewCase;
