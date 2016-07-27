import React from 'react';
import { connect } from 'react-redux'
import FormEditAccount from './FormEditAccount.jsx';

const AccountConnect = ({ status }) => {
	if (status == 'LOGGED_IN') {
		return <FormEditAccount />	
	}
	return null;
};

const Account = connect(
	state => state.userObject
)(AccountConnect)

export default Account;