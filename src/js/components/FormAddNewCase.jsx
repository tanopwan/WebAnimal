import React from 'react';

import userServices from '../services/user-services.js';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'


class FormAddNewCase extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormAddNewCase}: " + JSON.stringify(props));
        this.setState({form: {
        	username: props.userObject.username
        }});
    }

	handleSubmit(event) {
		event.preventDefault();

		console.log($("select[name='animalType']").val())
		var formData = new FormData();
		formData.append('userId', this.props.userObject.userId);
		formData.append('caseName', $('input[name=caseName]').val());
		formData.append('animalType', $("select[name='animalType']").val());
		formData.append('animalName', '');
		formData.append('caseStatus', $("select[name='caseStatus']").val())
		formData.append('createdDate', new Date());
		formData.append('caseDate', '');
		formData.append('description', $('textarea[name=description]').val());
		formData.append('profile_picture', $('input[type=file]')[0].files[0]);

		$.ajax({
		    url: '/api/case/addNewCase',
		    data: formData,
		    contentType: false,
		    processData: false,
		    type: "POST",
	        dataType: "json",
	        success: function(data, textStatus, jqXHR) {
	           //process data
	           console.log(data);
	           console.log(textStatus);
	           console.log(jqXHR);
	        },
	        error: function(data, textStatus, jqXHR) {
	           //process error msg
	           console.log(data);
	           console.log(textStatus);
	           console.log(jqXHR);
	        },
		});
	}

	/*handleCaseNameChange(event) {
        this.setState({
        	caseName: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
        	description: event.target.value
        });
    }*/

    render() {
        return (
        	
        	<div className="col-xs-12">
	        	<Form horizontal name="AddNewCase" onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
				    <FormGroup controlId="formHorizontalUsername">
					    <Col componentClass={ControlLabel} sm={2}>
					        เจ้าของเคส
					    </Col>
					    <Col sm={10}>
					        <FormControl.Static>{this.props.userObject.username}</FormControl.Static>
					    </Col>
				    </FormGroup>
				    <FormGroup controlId="formHorizontalCaseProfile">
					    <Col componentClass={ControlLabel} sm={2}>
					        รูปโปรไฟล์
					    </Col>
					    <Col sm={10}>
						    <div className="fileinput fileinput-new" data-provides="fileinput">
							  <div className="fileinput-preview thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}></div>
							  <div>
							    <span className="btn btn-default btn-file"><span className="fileinput-new">เลือกรูป</span><span className="fileinput-exists">Change</span><input type="file" name="profile_picture" accept="image/*"/></span>
							    <a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
							  </div>
							</div>
						</Col>
				    </FormGroup>
				    <FormGroup controlId="formHorizontalCaseName">
					    <Col componentClass={ControlLabel} sm={2}>
					        หัวข้อ
					    </Col>
					    <Col sm={10}>
					        <FormControl name="caseName" type="text" placeholder="ขื่อเคส" />
					    </Col>
				    </FormGroup>
				    <FormGroup controlId="formControlsDescription">
				    	<Col componentClass={ControlLabel} sm={2}>
					        รายละเอียด
					    </Col>
				    	<Col sm={10}>
				     		<FormControl name="description" componentClass="textarea" placeholder="รายละเอียด" />
				     	</Col>
				    </FormGroup>
				    <FormGroup>
				    	<Col componentClass={ControlLabel} sm={2}>
					        ประเภทสัตว์
					    </Col>
				    	<Col sm={10}>
					      	<FormControl name="animalType" componentClass="select" placeholder="กรุณาเลือก">
					        	<option value="dog">สุนัข</option>
					        	<option value="cat">แมว</option>
					        	<option value="others">อื่นๆ</option>
					      	</FormControl>
					    </Col>
					</FormGroup>
					<FormGroup controlId="formControlsSelect">
				    	<Col componentClass={ControlLabel} sm={2}>
					        สถานะเคส
					    </Col>
				    	<Col sm={10}>
					      	<FormControl name="caseStatus" componentClass="select" placeholder="กรุณาเลือก">
					        	<option value="open_fund">เปิดระดมทุน</option>
					        	<option value="close_fund">ปิดการระดมทุน</option>
					      	</FormControl>
				      	</Col>
				    </FormGroup>
		            <div className="row">
		            	<div className="col-xs-offset-4 col-xs-8">
		            		<Button bsStyle="success" type="submit">Success</Button>
		            	</div>
		            </div>
	            </Form>
			</div>
        );
    }
}


export default FormAddNewCase;