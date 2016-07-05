import React from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

import CaseServices from '../services/case-services.js';
import { setError, resetError, SET_ERROR, ErrorTypes } from '../redux/actions'

class FormDonor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			donorName: "",
			description: "",
			animalType: "dog",
			donorStatus: "open",
			imagePath: "uploads/processed/anonymous.webp",
			fileinputClass: "fileinput-new"
		};
	}

	componentWillReceiveProps(props) {
		console.log("componentWillReceiveProps{FormDonor}: " + JSON.stringify(props));
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
    	console.log("componentDidMount{FormDonor}: " + JSON.stringify(this.props));
    	if (this.props.item) {
			this.setState(this.props.item);
		}
		if (this.props.userObject) {
			this.setState({user: this.props.userObject});
		}

		var self = this;
		this.unsubscribe = this.context.store.subscribe(() => {
			this.forceUpdate();
		});
    }

	componentDidUnMount() {
        console.log("componentDidUnMount{FormDonor}");
        this.unsubscribe();
    }

	handledonorNameChange(event) {
        this.setState({
        	donorName: event.target.value
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

    handledonorStatusChange(event) {
    	this.setState({
        	donorStatus: event.target.value
        });	
    }

    handleSubmit(event) {
    	event.preventDefault();
    	var store = this.context.store;
    	store.dispatch(resetError(ErrorTypes.ERR_FORM_INVALID));
		if (event.target) {
			var donorName = event.target.donorName.value;
			var description = event.target.description.value;
			var animalType = event.target.animalType.value;
			var donorStatus = event.target.donorStatus.value;
			var profilePicture = event.target.profilePicture.files[0];

			if (!donorName) {
				store.dispatch(setError(ErrorTypes.ERR_FORM_INVALID, {donorName: "กรุณาใส่ชื่อสัตว์เลี้ยงผู้บริจาค"}));
				return;
			}

	        CaseServices.addNewCase(this.props.userObject.accessToken,
	        						this.props.userObject.userId,
	        						donorName,
	        						description,
	        						animalType,
	        						donorStatus,
	        						null,
	        						profilePicture)
	        .then(function(res) {
	            console.log("return from CaseServices.addNewCase: " + JSON.stringify(res));
	            if (res.code == 200) {
	                store.dispatch(resetError(res));
	            }
	            else {
	            	store.dispatch(setError(ErrorTypes.ERR_MAIN, res.message));
	            }
	        }, function(onRejected) {
	        	store.dispatch(setError(ErrorTypes.ERR_MAIN, JSON.stringify(onRejected)));
	        })
	        .catch(
				function(errorThrown) {
				    console.log("Exception: ", errorThrown);
				}
			);
		}
    }

    render() {
        return (
        	<div className="col-xs-12">
	        	<Form horizontal name="FormDonor" onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
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
						    <div className={"fileinput " + this.state.fileinputClass} data-provides="fileinput">
								<div className="fileinput-new thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}></div>
								<div className="fileinput-preview fileinput-exists thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}>
									<img src={"http://localhost:3000/" + this.state.imagePath}/>
								</div>
							  	<div>
							  		<span className="btn btn-default btn-file"><span className="fileinput-new">เลือกรูป</span><span className="fileinput-exists">เปลี่ยน</span>
							  		<input type="file" name="profilePicture" accept="image/*"/></span>
							    	<a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">ลบ</a>
							  	</div>
							</div>
						</Col>
				    </FormGroup>
				    <FormGroup controlId="formHorizontaldonorName" className="info">
					    <Col componentClass={ControlLabel} sm={2}>
					        หัวข้อ
					    </Col>
					    <Col sm={10}>
					        <FormControl name="donorName" type="text" placeholder="ขื่อเคส" value={this.state.donorName} onChange={this.handledonorNameChange.bind(this)}/>

						    {(function(error, self) {
		                        if (error.donorName) {
		                            return (<span className="help-block">{self.context.store.getState().errorObject.formError.message.donorName}</span>);
		                        }
		                    })(this.context.store.getState().errorObject.formError.message, this)}
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
					      	<FormControl componentClass="select" name="donorStatus" placeholder="กรุณาเลือก" onChange={this.handledonorStatusChange.bind(this)} value={this.state.donorStatus}>
					        	<option value="open">สามารถบริจาคได้</option>
					        	<option value="close">ไม่สามารถบริจาคได้</option>
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

FormDonor.contextTypes = {
    store: React.PropTypes.object
}

export default FormDonor;