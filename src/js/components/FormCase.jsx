import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

import { setError, resetError, SET_ERROR, ErrorTypes } from '../redux/actions'

class FormCase extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			caseName: "",
			animalName: "",
			description: "",
			animalType: "dog",
			fileinputClass: "fileinput-new"
		};
	}

	handleCaseNameChange(event) {
		this.setState({
			caseName: event.target.value
		});
	}

	handleAnimalNameChange(event) {
		this.setState({
			animalName: event.target.value
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

	handleSubmit(event) {
		event.preventDefault();
		if (event.target) {
			let caseName = this.state.caseName;
			let description = this.state.description;
			let animalType = this.state.animalType;
			let animalName = this.state.animalName;
			let profilePicture = event.target.profilePicture.files[0];

			if(this.props.require(caseName, description, profilePicture)) {
				this.props.create(profilePicture, caseName, description, animalType, animalName);
			}
		}
	}

	render() {
		return (
			<div className="col-xs-12">
				<Form horizontal name="FormCase" onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
					<FormGroup controlId="formHorizontalUsername">
						<Col componentClass={ControlLabel} sm={2}>
							เจ้าของเคส
						</Col>
						<Col sm={8}>
							<FormControl.Static>{this.props.username}</FormControl.Static>
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalCaseProfile">
						<Col componentClass={ControlLabel} sm={2}>
							รูปโปรไฟล์
						</Col>
						<Col sm={8}>
							<div className={"fileinput " + this.state.fileinputClass} data-provides="fileinput">
								<div className="fileinput-new thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}></div>
								<div className="fileinput-preview fileinput-exists thumbnail" data-trigger="fileinput" style={{width: "200px", height: "150px"}}>
									<img src="http://localhost:3000/images/anonymous.webp"/>
								</div>
								<div>
									<span className="btn btn-default btn-file"><span className="fileinput-new">เลือกรูป</span><span className="fileinput-exists">เปลี่ยน</span>
									<input type="file" name="profilePicture" accept="image/*"/></span>
									<a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">ลบ</a>
									{(function(error, self) {
										if (error) {
											return (<span className="label label-danger">{error}</span>);
										}
									})(this.props.formError.profilePicture, this)}
								</div>
							</div>
						</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalCaseName" className="info">
						<Col componentClass={ControlLabel} sm={2}>
							หัวข้อ
						</Col>
						<Col sm={8}>
							<FormControl name="caseName" type="text" placeholder="ขื่อเคส" value={this.state.caseName} onChange={this.handleCaseNameChange.bind(this)}/>
						</Col>
						<Col sm={2}>
							{(function(error, self) {
								if (error) {
									return (<span className="label label-danger">{error}</span>);
								}
							})(this.props.formError.caseName, this)}
      					</Col>
					</FormGroup>
					<FormGroup controlId="formHorizontalAnimalName" className="info">
						<Col componentClass={ControlLabel} sm={2}>
							ขื่อสัตว์
						</Col>
						<Col sm={8}>
							<FormControl name="animalName" type="text" placeholder="ขื่อสัตว์" value={this.state.animalName} onChange={this.handleAnimalNameChange.bind(this)}/>
						</Col>
					</FormGroup>
					<FormGroup controlId="formControlsDescription">
						<Col componentClass={ControlLabel} sm={2}>
							รายละเอียด
						</Col>
						<Col sm={8}>
							<FormControl name="description" componentClass="textarea" placeholder="รายละเอียด" value={this.state.description} onChange={this.handleDescriptionChange.bind(this)}/>
						</Col>
						<Col sm={2}>
							{(function(error, self) {
								if (error) {
									return (<span className="label label-danger">{error}</span>);
								}
							})(this.props.formError.description, this)}
      					</Col>
					</FormGroup>
					<FormGroup>
						<Col componentClass={ControlLabel} sm={2}>
							ประเภทสัตว์
						</Col>
						<Col sm={8}>
							<FormControl componentClass="select" name="animalType" placeholder="กรุณาเลือก" onChange={this.handleAnimalTypeChange.bind(this)} value={this.state.animalType}>
							<option value="dog">สุนัข</option>
							<option value="cat">แมว</option>
							<option value="others">อื่นๆ</option>
							</FormControl>
						</Col>
					</FormGroup>
					<div className="row">
						<div className="col-xs-offset-2 col-xs-10">
							<Button bsStyle="success" type="submit">Success</Button>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

export default FormCase;
