import React from 'react';
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

import { hideModal } from '../redux/actions'

const ModalContent = ({title, body, imagePath, style, hideModal}) => (
<div className="static-modal">
	<Modal.Dialog>
		<Modal.Header>
			<Modal.Title>{title}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			{body}
			{
				(() => {
					if (imagePath) {
						return <img src={imagePath} />
					}
				})()
			}
		</Modal.Body>
		<Modal.Footer>
			<Button bsStyle={style} onClick={() => hideModal()}>ปิดหน้าต่าง</Button>
		</Modal.Footer>
	</Modal.Dialog>
</div>
);

const mapStateToProps = (state) => {
    return {
        title: state.modal.title,
        body: state.modal.body,
		imagePath: state.modal.imagePath,
        style: state.modal.style
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideModal: () => dispatch(hideModal())
    }
}

const ModalPopup = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalContent)

const ModalRoot = ({ hasModal }) => {
	if (!hasModal) {
		return <span />; // after React v15 you can return null here
	}

	return <ModalPopup/>
}

export default connect(
  state => state.modal
)(ModalRoot)
