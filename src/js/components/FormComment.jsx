import React from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

import CaseServices from '../services/case-services.js';
import { setError, resetError, ErrorTypes } from '../redux/actions'

const handleCommentChange = event => {
	this.setState({
       	comment: event.target.value
    });
}

const submitComment = (event, store) => {
	event.preventDefault();

	var comment = event.target.comment.value;
	var comment_picture = null;
	var isAttached = $('#tab-attach-image').attr('class') === "collapse in";
	if (isAttached && event.target.comment_picture.files[0]) {
		comment_picture = event.target.comment_picture.files[0];
	}
	
	if (comment.length == 0) {
		var err = {comment: "กรุณาใส่คอมเมนต์"};
		store.dispatch(setError(ErrorTypes.ERR_FORM_INVALID, err));
		return;
	}

	if (comment.length >= 1000) {
		var err = {comment: "ข้อความยาวเกิน 1000 ตัวอักษร"};
		store.dispatch(setError(ErrorTypes.ERR_FORM_INVALID, err));	
		return;
	}

	var self = this;
    CaseServices.addComment(comment, comment_picture, store.getState().userObject.userId, "case001").then(function(res) {
		console.log("return from CaseServices.addComment: " + JSON.stringify(res));
		if (res.code == 200) {
			
		}
		else {
			var err = "ไม่สามารถบันทึกข้อมูลได้ : " + JSON.stringify(err);
			store.dispatch(setError(ErrorTypes.ERR_MAIN, err));
		}
	});
}

const handleReset = (event, store) => {
	event.preventDefault();
	$('.fileinput').fileinput('clear');
	$('textarea[name=comment]').val('');
	store.dispatch(resetError(ErrorTypes.ERR_FORM_INVALID));
	store.dispatch(resetError(ErrorTypes.ERR_MAIN));
}

const RenderFormControlsComment = ({comment, handleChange}) => (
     <FormControl name="comment" componentClass="textarea" placeholder="ข้อความ" value={comment} onChange={handleChange}/>    
);

const RenderButtonGroup = ({onClick, store}) => (
	<div className="btn-group top10">
        <button type="button" name="toggleUpload" className="btn btn-default btn-sm" data-toggle="collapse" data-target="#tab-attach-image">
        	แนบรูป <span className="glyphicon glyphicon-menu-down"></span>
        </button>
        <button type="submit" className="btn btn-default btn-sm">ส่งข้อความ</button>
        <button type="button" className="btn btn-default btn-sm" onClick={(event) => { return onClick(event, store) }}>ลบข้อความ</button>
	</div>
);

class FormComment extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			imagePath: "uploads/processed/anonymous.webp",
			fileinputClass: "fileinput-new"
		};
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormComment}: " + JSON.stringify(props));
    }

    componentDidMount() {
    	console.log("componentDidMount{FormComment}: " + JSON.stringify(this.props));
    }

    render() {
        return (
        	<div className="thumbnail" style={{width: 342}}>
	        	<Form horizontal name="FormCase" onSubmit={(event) => { return submitComment(event, this.context.store) }} encType="multipart/form-data">
	        		<div className="panel panel-collapse">
		        		<div className="panel-heading">
							<p>โดย {this.context.store.getState().userObject.username}</p>
						    {(function(error, self) {
		                        if (error.comment) {
			                        return (<div className="alert alert-danger">{self.context.store.getState().errorObject.formError.message.comment}</div>);
				                }
				            })(this.context.store.getState().errorObject.formError.message, this)}
				            {RenderFormControlsComment(this.state.comment, handleCommentChange.bind(this))}
				            <RenderButtonGroup onClick={handleReset.bind(this)} store={this.context.store}/>
					    </div>
					    <div className="panel-body">
						    <div id="tab-attach-image" className="collapse">
							    <div className={"fileinput " + this.state.fileinputClass} data-provides="fileinput">
									<div className="fileinput-new thumbnail" data-trigger="fileinput" style={{width: "300px", height: "200px"}}></div>
									<div className="fileinput-preview fileinput-exists thumbnail" data-trigger="fileinput" style={{width: "300px", height: "200px"}}>
										<img data-src={"http://localhost:3000/" + this.state.imagePath}/>
									</div>
								  	<div className="btn-group">
								  		<span className="btn btn-default btn-sm btn-file">
								  			<span className="fileinput-new">เลือกรูป</span>
								  			<span className="fileinput-exists">เปลี่ยน</span>
								  			<input type="file" name="comment_picture" accept="image/*"/>
								  		</span>
								  		<a href="#" className="btn btn-default btn-sm fileinput-exists" data-dismiss="fileinput">ลบ</a>
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

FormComment.contextTypes = {
    store: React.PropTypes.object
}

export default FormComment;