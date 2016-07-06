import React from 'react';
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router';

import { onLogout, showLogin } from '../redux/actions'

import userServices from '../services/user-services.js';

const LoginButton = ({dispatch}) => (
	<div className="dropdown pull-right">
		<button className="btn btn-link dropdown-toggle" type="button" onClick={() => { dispatch(showLogin()) }} >
			<img src="images/50.webp" /> เข้าสู่ระบบ
		</button>
	</div>
	)

const LoginButtonContainer = connect(
    (state) => { return {} },
    (dispatch) => { return { dispatch } }
)(LoginButton)

const DropdownButton = ({fbId, username, dispatch}) => (
	<div className="dropdown pull-right">
		<button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown">
            <img src={"https://graph.facebook.com/v2.6/" + fbId + "/picture"} /> สวัสดี, {username} <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
            <li><Link to="/">ข้อมูลส่วนตัว</Link></li>
            <li><Link to="/">เปลี่ยนรหัสผ่าน</Link></li>
            <li><button className="btn btn-link" type="button" onClick={() => { dispatch(onLogout()) }} >ออกจากระบบ</button></li>
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
	if (status != 'LOGGED_IN') {
		return <LoginButtonContainer />; // after React v15 you can return null here
	}

	return <DropdownButtonContainer/>
}

export default connect(
  state => state.userObject
)(AccountMenu)
