import React from 'react';
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import userServices from '../services/user-services.js';
import { hideLogin, doLogin } from '../redux/actions'

const LoginContent = ({title, body, dispatch}) => (
<div className="static-modal">
	<Modal.Dialog>
		<Modal.Header>
			<Modal.Title>ยินดีต้อนรับ</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<p> กรุณาล็อคอินเพื่อความสะดวกในการใช้งาน </p>
			<a className="btn btn-block btn-social btn-facebook" onClick={() => { userServices.facebookLogin(dispatch); dispatch(hideLogin()); }}>
		    	<span className="fa fa-facebook"></span> Sign in with Facebook
			</a>
		</Modal.Body>
		<Modal.Footer>
			<Button onClick={() => dispatch(hideLogin())}>ปิดหน้าต่าง</Button>
		</Modal.Footer>
	</Modal.Dialog>
</div>
);

const mapStateToProps = (state) => {
    return {
        title: state.modal.title,
        body: state.modal.body
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const LoginPopup = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContent)

const LoginRoot = ({ hasModal }) => {
	if (!hasModal) {
		return <span />; // after React v15 you can return null here
	}

	return <LoginPopup/>
}

export default connect(
  state => state.login
)(LoginRoot)
