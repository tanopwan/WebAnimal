import React from 'react';
import { connect } from 'react-redux'

import FormAccount from './FormAccount.jsx'
//import CaseServices from '../services/case-services.js';
//import { setError, resetError, SET_ERROR, ErrorTypes } from '../redux/actions'

const mapStateToProps = (state) => {
    return {
        userObject: state.userObject
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const FormEditAccount = connect(
	mapStateToProps,
    mapDispatchToProps
)(FormAccount)

export default FormEditAccount;