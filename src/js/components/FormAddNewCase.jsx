import React from 'react';
import { connect } from 'react-redux'

import FormCase from './FormCase.jsx'
import CaseServices from '../services/case-services.js';
import { setError, resetError, SET_ERROR, ErrorTypes } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        userObject: state.userObject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        handleSubmit: (accessToken, userId, caseName, description, animalType, caseStatus, caseDate, profilePicture) => {
        	CaseServices.addNewCase(accessToken, userId, caseName, description, animalType, caseStatus, caseDate, profilePicture)
	        .then(function(res) {
	            console.log("return from CaseServices.addNewCase: " + JSON.stringify(res));
	            if (res.code == 200) {
	                dispatch(resetError(res));
	            }
	            else {
	            	dispatch(setError(ErrorTypes.ERR_MAIN, res.message));
	            }
	        }, function(onRejected) {
	        	dispatch(setError(ErrorTypes.ERR_MAIN, JSON.stringify(onRejected)));
	        })
	        .catch(
				function(errorThrown) {
				    console.log("Exception: ", errorThrown);
				}
			);
        }
    }
}

const FormAddNewCase = connect(
	mapStateToProps,
    mapDispatchToProps
)(FormCase)

export default FormAddNewCase;