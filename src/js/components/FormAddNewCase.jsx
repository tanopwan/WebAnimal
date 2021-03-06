import React from 'react';
import { connect } from 'react-redux'

import FormCase from './FormCase.jsx'
import CaseServices from '../services/case-services.js';
import UploadServices from '../services/upload-services.js';
import * as Actions from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        formError: state.errorObject.formError,
        username: state.userObject.username
    }
}

const createCase = (caseName, description, animalType, animalName, imagePath) => {
	return (dispatch, getState) => {
		let state = getState();
		var accessToken = state.userObject.accessToken;
        var userId = state.userObject.userId;
        CaseServices.createCase(accessToken, userId, caseName, description, animalType, animalName, imagePath).then(function(result) {
            console.log(result);
            if (result.code == 0) {
                dispatch(Actions.showSuccessModal("สร้างเคสสำเร็จ", ""));
                //redirect to view case page
            }
            else {
                dispatch(Actions.showWarningModal("สร้างเคสไม่สำเร็จ", result.message));
            }
        }, function(error) {
            dispatch(Actions.showWarningModal("สร้างเคสไม่สำเร็จ", error.responseText));
        })
	}
}

const createUpload = (file, caseName, description, animalType, animalName) => {
	return (dispatch, getState) => {
		let state = getState();
		var accessToken = state.userObject.accessToken;
		var userId = state.userObject.userId;
		UploadServices.uploadSingleFile(accessToken, userId, file).then( function(result) {
            let imagePath = result.object.imagePath;
            dispatch(createCase(caseName, description, animalType, animalName, imagePath));
		}, function(error) {
			console.log(error);
            dispatch(Actions.showWarningModal("สร้างเคสไม่สำเร็จ", "ไม่สามารถ upload รูปภาพได้"));
		});
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        create: (file, caseName, description, animalType, animalName) => {
        	dispatch(createUpload(file, caseName, description, animalType, animalName));
        },
        require: (caseName, description, profilePicture) => {
            let hasError = false;
            dispatch(Actions.resetError(Actions.ErrorTypes.ERR_FORM_INVALID));
            if (!caseName) {
                hasError = true;
                dispatch(Actions.setFormError("caseName", "จำเป็น"));
            }
            if (!description) {
                hasError = true;
                dispatch(Actions.setFormError("description", "จำเป็น"));
            }
            if (!profilePicture) {
                hasError = true;
                dispatch(Actions.setFormError("profilePicture", "จำเป็น"));
            }
            return !hasError;
        }
    }
}

const FormAddNewCase = connect(
	mapStateToProps,
    mapDispatchToProps
)(FormCase)

export default FormAddNewCase;
