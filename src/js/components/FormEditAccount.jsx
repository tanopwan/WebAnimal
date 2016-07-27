import React from 'react';
import { connect } from 'react-redux'

import FormAccount from './FormAccount.jsx'
import UserServices from '../services/user-services.js';
import * as Actions from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        username: state.userObject.username,
        email: state.userObject.email,
        mobile: state.userObject.mobile,
        lineId: state.userObject.lineId
    }
}

const updateUser = (userId, email, mobile, lineId) => {
    return (dispatch, getState) => {
        let state = getState();
        var accessToken = state.userObject.accessToken;
        var userId = state.userObject.userId;
        var data = { userId, email, mobile, lineId };
        UserServices.updateUser(data, accessToken).then(function(result) {
        	dispatch(Actions.onUpdateUser({email, mobile, lineId}));
        	dispatch(Actions.showSuccessModal("Success", "บันทึกสำเร็จ"));
        }, function(error) {
        	console.log(error);
        	dispatch(Actions.showWarningModal("Error", "ไม่สามารถบันทึกได้"));
        });
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (email, mobile, lineId) => {
        	dispatch(updateUser(email, mobile, lineId));
        }
    }
}

const FormEditAccount = connect(
	mapStateToProps,
    mapDispatchToProps
)(FormAccount)

export default FormEditAccount;