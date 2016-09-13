import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { onLogout, showLogin, showWarningModal } from '../redux/actions'
import { browserHistory } from 'react-router'

import userServices from '../services/user-services.js';

const handleLogout = (event) => {
    event.preventDefault()
    return (dispatch, getState) => {
        let userId = getState().userObject.userId;
        let accessToken = getState().userObject.accessToken;
        userServices.userLogout({userId}, accessToken).then( function(resolve) {
            dispatch(onLogout());
            browserHistory.push('/')
        }, function(reject) {
            dispatch(showWarningModal("ไม่สามารถออกจากระบบได้", reject.responseText));
        });
    };
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

const DropdownButton = ({fbId, username, dispatch}) => (
	<div className="dropdown pull-right">
		<img src={"https://graph.facebook.com/v2.6/" + fbId + "/picture"} />
		<a href="#" className="dropdown-toggle" data-toggle="dropdown">
             สวัสดี, {username} <span className="caret"></span>
        </a>
        <ul className="dropdown-menu">
            <li><Link to="/account">ข้อมูลส่วนตัว</Link></li>
            <li><Link to="/mycases">เคสของฉัน</Link></li>
            <li><Link to="/following">เคสที่ติดตาม</Link></li>
            <li><a href="#" onClick={(event) => dispatch(handleLogout(event))} >ออกจากระบบ</a></li>
        </ul>
    </div>)

const mapStateToProps = (state) => {
    return {
        fbId: state.userObject.fbId,
        username: state.userObject.username
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
    if (status == 'LOGGED_IN' ) {
        return <DropdownButtonContainer/>;
    }
    
	if (status == 'LOGGED_OUT' || status == 'UNAUTH') {
		return <LoginButtonContainer />; // after React v15 you can return null here
	}

	return null;
}

export default connect(
    state => state.userObject
)(AccountMenu)
