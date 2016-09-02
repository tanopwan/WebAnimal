import React from 'react';
import { connect } from 'react-redux'

import CaseServices from '../services/case-services.js';

const displayFundStatus = fundStatus => {
	if (fundStatus == 'close') {
		return (
			<div className="btn btn-default btn-lg">
				<span className="glyphicon glyphicon-usd"></span> ปิดระดมทุน
			</div>
		);
	}
	else {
		return (
			<button type="button" className="btn btn-default btn-lg">
				<span className="glyphicon glyphicon-usd"></span> เปิดระดมทุน
			</button>
		);
	}
}

const CaseDetailPresentational = ({username, caseName, description, animalName, fundStatus, imagePath, host}) => (
	<div className="panel panel-default">
		<div className="panel-body">
			{
				//Prevent error undefined imagePath
				(() => {
					if (imagePath)
						return <img className="detail-image" src={host + '/' + imagePath}/>;
				})()

			}
			<span className="detail-header">เคส {animalName} โดยมี <span className="label label-primary">{username}</span> เป็นเจ้าของเคส</span>
			<span className="detail-title">{caseName}</span>
			<span className="detail-description">"{description}"</span>
			{displayFundStatus(fundStatus)}
		</div>
	</div>
)

const mapStateToProps = (state) => {
    return {
		host: state.host,
		username: state.action.view.username,
		caseName: state.action.view.caseName,
		description: state.action.view.description,
		animalName: state.action.view.animalName,
		fundStatus: state.action.view.fundStatus,
		imagePath: state.action.view.imagePath
	}
}

const CaseDetail = connect(
	mapStateToProps,
	null
)(CaseDetailPresentational);

export default CaseDetail;
