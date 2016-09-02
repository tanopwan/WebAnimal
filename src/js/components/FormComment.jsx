import React from 'react';
import { connect } from 'react-redux'
import promise from 'es6-promise';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

import CaseServices from '../services/case-services.js';
import UploadServices from '../services/upload-services.js';
import * as Actions from '../redux/actions'

const handleCommentChange = event => {
	this.setState({
       	comment: event.target.value
    });
}

const RenderFormControlsComment = ({comment, handleChange}) => (
     <FormControl className="input-text-font" name="comment" componentClass="textarea" placeholder="ข้อความ" value={comment} onChange={handleChange}/>
);

const mapDispatchToPropsButtonGroup = (dispatch) => {
	return {
		resetForm: event => {
			event.preventDefault();
			$('.fileinput').fileinput('clear');
			$('textarea[name=comment]').val('');
			dispatch(Actions.resetError(Actions.ErrorTypes.ERR_FORM_INVALID));
			dispatch(Actions.resetError(Actions.ErrorTypes.ERR_MAIN));
		}
	}
}

const RenderButtonGroupConnect = ({resetForm}) => (
	<div className="btn-group top10">
        <button type="button" name="toggleUpload" className="btn btn-default btn-md input-text-font" data-toggle="collapse" data-target="#tab-attach-image">
        	แนบรูป
        </button>
        <button type="submit" className="btn btn-default btn-md input-text-font">ส่งข้อความ</button>
        <button type="button" className="btn btn-default btn-md input-text-font" onClick={(event) => { return resetForm(event) }}>ลบข้อความ</button>
	</div>
);

const RenderButtonGroup = connect(null, mapDispatchToPropsButtonGroup)(RenderButtonGroupConnect);

class FormCommentConnect extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			fileinputClass: "fileinput-new"
		};
	}

	componentWillReceiveProps(props) {
    }

    componentDidMount() {
    }

    render() {
        return (
        	<div className="thumbnail" style={{width: 342}}>
	        	<Form horizontal name="FormCase" onSubmit={(event) => { return this.props.submitComment(event) }} encType="multipart/form-data">
	        		<div className="panel panel-collapse">
		        		<div className="panel-heading">
							<span className="detail-header">คอมเมนต์โดย {this.props.username}</span>
						    {
								(() => {
			                        if (this.props.formError.comment) {
				                        return (<div className="alert alert-danger">{JSON.stringify(this.props.formError.comment)}</div>);
					                }
				            	})()
							}
				            {RenderFormControlsComment(this.state.comment, handleCommentChange.bind(this))}
				            <RenderButtonGroup />
					    </div>
					    <div className="panel-body">
						    <div id="tab-attach-image" className="collapse">
							    <div className={"fileinput " + this.state.fileinputClass} data-provides="fileinput">
									<div className="fileinput-new thumbnail" data-trigger="fileinput" style={{width: "300px", height: "200px"}}></div>
									<div className="fileinput-preview fileinput-exists thumbnail" data-trigger="fileinput" style={{width: "300px", height: "200px"}}>
									</div>
								  	<div className="btn-group">
								  		<span className="btn btn-default btn-sm btn-file">
								  			<span className="fileinput-new input-text-font">เลือกรูป</span>
								  			<span className="fileinput-exists input-text-font">เปลี่ยน</span>
								  			<input type="file" name="comment_picture" accept="image/*"/>
								  		</span>
								  		<a href="#" className="btn btn-default btn-sm fileinput-exists input-text-font" data-dismiss="fileinput">ลบ</a>
								  	</div>
								</div>
							</div>
					    </div>
		            </div>
	            </Form>
			</div>
        );
    }
}

const addComment = (comment, file) => {
	return (dispatch, getState) => {
		let state = getState();
		let accessToken = state.userObject.accessToken;
		let userId = state.userObject.userId;
		let caseId = state.action.view.caseId;

		new Promise((resolve, reject) => {
			if (file) {
				UploadServices.uploadSingleFile(accessToken, userId, file).then( function(result) {
					resolve(result);
				}, function(error) {
					reject(error);
				})
			}
			else {
				resolve( { code: 0, object: {} } );	// No upload image
			}
		})
		.then( function(result) {
			if (result.code == 0) {
				let uploadId = result.object.uploadId;
				return CaseServices.addComment(accessToken, userId, caseId, comment, uploadId);
			}
			return Promise.reject("ไม่สามารถบันทึกรูปภาพได้");
		})
		.then(function(res) {
			if (res.code == 0) {
				$('.fileinput').fileinput('clear');
				$('textarea[name=comment]').val('');
				dispatch(Actions.resetError(Actions.ErrorTypes.ERR_FORM_INVALID));
				dispatch(Actions.resetError(Actions.ErrorTypes.ERR_MAIN));
			}
			else {
				dispatch(Actions.showWarningModal("ไม่สามารถบันทึกข้อมูลได้", JSON.stringify(res.message)));
			}
		})
		.catch(function(error) {
            dispatch(Actions.showWarningModal("คอมเมนต์ไม่สำเร็จ", error));
		});
	}
}

const mapStateToProps = (state) => {
	return {
		username: state.userObject.username,
		formError: state.errorObject.formError
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
		submitComment: (event) => {
			event.preventDefault();

			var comment = event.target.comment.value;
			var comment_picture = null;
			var isAttached = $('#tab-attach-image').attr('class') === "collapse in";
			if (isAttached && event.target.comment_picture.files[0]) {
				comment_picture = event.target.comment_picture.files[0];
			}

			if (comment.length == 0) {
				dispatch(Actions.setFormError("comment", "กรุณาใส่ข้อความ"));
				return;
			}

			if (comment.length >= 1000) {
				dispatch(Actions.setFormError("comment", "ข้อความยาวเกิน 1000 ตัวอักษร"));
				return;
			}

			dispatch(addComment(comment, comment_picture));
		}
	}
}

const FormComment = connect(mapStateToProps, mapDispatchToProps)(FormCommentConnect);
export default FormComment;
