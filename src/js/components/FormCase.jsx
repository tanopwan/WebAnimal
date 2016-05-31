import React from 'react';

import { Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

class FormCase extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			caseName: "",
			description: "",
			animalType: "dog",
			caseStatus: "open_fund",
			imagePath: "uploads/processed/anonymous.webp",
			fileinputClass: "fileinput-new"
		};
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormCase}: " + JSON.stringify(props));
		if (props.item) {
			var item = props.item;
			if (item.imagePath) {
				item.fileinputClass = "fileinput-exists";
			}
			if (!item.imagePath) {
				item.imagePath = "uploads/processed/anonymous.webp";
			}
			this.setState(item);
		}
		if (props.userObject) {
			this.setState({user: props.userObject});
		}
    }

    componentDidMount() {
    	console.log("componentDidMount{FormCase}: " + JSON.stringify(this.props));
    	if (this.props.item) {
			this.setState(this.props.item);
		}
		if (this.props.userObject) {
			this.setState({user: this.props.userObject});
		}
    }

	handleCaseNameChange(event) {
        this.setState({
        	caseName: event.target.value
        });
    }

    handleDescriptionChange(event) {
        this.setState({
        	description: event.target.value
        });
    }

    handleAnimalTypeChange(event) {
    	this.setState({
        	animalType: event.target.value
        });
    }

    handleCaseStatusChange(event) {
    	this.setState({
        	caseStatus: event.target.value
        });	
    }

    render() {
        return (
        	<div className="col-xs-12">
	        	<Form horizontal name="FormCase" onSubmit={this.props.handleSubmit} encType="multipart/form-data">
				    <FormGroup controlId="formHorizontalUsername">
					    <Col componentClass={ControlLabel} sm={2}>
					        เจ้าของเคส
					    </Col>
					    <Col sm={10}>
					        <FormControl.Static>{this.state.user.username}</FormControl.Static>
					    </Col>
				    </FormGroup>
				    <FormGroup controlId="formHorizontalCaseProfile">
					    <Col componentClass={ControlLabel} sm={2}>
					        รูปโปรไฟล์
					    </Col>
					    <Col sm={10}>
						    <div className={"fileinput " + this.state.fileinputClass} data-provides="fileinput">
								<div className="fileinput-new thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}></div>
								<div className="fileinput-preview fileinput-exists thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}>
									<img src={"http://localhost:3000/" + this.state.imagePath}/>
								</div>
							  	<div>
							  		<span className="btn btn-default btn-file"><span className="fileinput-new">เลือกรูป</span><span className="fileinput-exists">เปลี่ยน</span>
							  		<input type="file" name="profile_picture" accept="image/*"/></span>
							    	<a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">ลบ</a>
							  	</div>
							</div>
						</Col>
				    </FormGroup>
				    <FormGroup controlId="formHorizontalCaseName">
					    <Col componentClass={ControlLabel} sm={2}>
					        หัวข้อ
					    </Col>
					    <Col sm={5}>
					        <FormControl name="caseName" type="text" placeholder="ขื่อเคส" value={this.state.caseName} onChange={this.handleCaseNameChange.bind(this)}/>
					    </Col>
					    <Col sm={5}>
					    {(function(error, self) {
	                        if (error.caseName) {
	                            return (<div className="alert alert-danger">{self.context.store.getState().errorObject.formError.caseName}</div>);
	                        }
	                    })(this.context.store.getState().errorObject.formError, this)}
					        
					    </Col>
				    </FormGroup>
				    <FormGroup controlId="formControlsDescription">
				    	<Col componentClass={ControlLabel} sm={2}>
					        รายละเอียด
					    </Col>
				    	<Col sm={10}>
				     		<FormControl name="description" componentClass="textarea" placeholder="รายละเอียด" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
				     	</Col>
				    </FormGroup>
				    <FormGroup>
				    	<Col componentClass={ControlLabel} sm={2}>
					        ประเภทสัตว์
					    </Col>
				    	<Col sm={10}>
					      	<FormControl componentClass="select" name="animalType" placeholder="กรุณาเลือก" onChange={this.handleAnimalTypeChange.bind(this)} value={this.state.animalType}>
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
					      	<FormControl componentClass="select" name="caseStatus" placeholder="กรุณาเลือก" onChange={this.handleCaseStatusChange.bind(this)} value={this.state.caseStatus}>
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

FormCase.contextTypes = {
    store: React.PropTypes.object
}

export default FormCase;