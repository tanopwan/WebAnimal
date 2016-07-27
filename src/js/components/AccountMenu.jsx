import React from 'react';
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router';

import { onLogout, showLogin, showWarningModal } from '../redux/actions'

import userServices from '../services/user-services.js';

const handleLogout = (userId, accessToken, dispatch) => {
    userServices.userLogout({userId}, accessToken).then( function(resolve) {
        dispatch(onLogout());
    }, function(reject) {
        dispatch(showWarningModal("ไม่สามารถออกจากระบบได้", reject.responseText));
    });
}

const LoginButton = ({dispatch}) => (
	<div className="dropdown pull-right">
		<a href="#" className="dropdown-toggle" onClick={() => { dispatch(showLogin()) }} >
			 เข้าสู่ระบบ
		</a>
	</div>
	)

const LoginButtonContainer = connect(
    (state) => { return {} },
    (dispatch) => { return { dispatch } }
)(LoginButton)

const DropdownButton = ({fbId, username, userId, accessToken, dispatch}) => (
	<div className="dropdown pull-right">
		<img src={"https://graph.facebook.com/v2.6/" + fbId + "/picture"} />
		<a href="#" className="dropdown-toggle" data-toggle="dropdown">
             สวัสดี, {username} <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
            <li><Link to="/account">ข้อมูลส่วนตัว</Link></li>
            <li><Link to="/mycases">เคสของฉัน</Link></li>
            <li><Link to="/following">เคสที่ติดตาม</Link></li>
            <li><Link to="/" onClick={() => handleLogout(userId, accessToken, dispatch)} >ออกจากระบบ</Link></li>
        </ul>
    </div>)

const mapStateToProps = (state) => {
    return {
        fbId: state.userObject.fbId,
        username: state.userObject.username,
        userId: state.userObject.userId,
        accessToken: state.userObject.accessToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const DropdownButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownButton)

const AccountMenu = ({ status }) => {
    if (status == 'NONE') {
        return null;
    }
	if (status != 'LOGGED_IN') {
		return <LoginButtonContainer />; // after React v15 you can return null here
	}

	return <DropdownButtonContainer/>
}

export default connect(
  state => state.userObject
)(AccountMenu)
