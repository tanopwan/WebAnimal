import React from 'react';
import { connect } from 'react-redux'

const CasePanel = ({item}) => (
    <div className="panel panel-default">
        <div className="panel-heading">{item.createdDate}</div>
        <div className="panel-body">
            <div className="col-xs-4">
                <img className="thumbnail" src={item.imagePath} width="150px"/>
            </div>
            <div className="col-xs-6">
                <div className="row section_vertical">
                    <div className="col-xs-4 text-right">
                        ชื่อเคส
                    </div>
                    <div className="col-xs-6">
                        {item.caseName}
                    </div>
                </div>
                <div className="row section_vertical">
                    <div className="col-xs-4 text-right">
                        รายละเอียด
                    </div>
                    <div className="col-xs-6">
                        {item.description}
                    </div>
                </div>
                <div className="row section_vertical">
                    <div className="col-xs-4 text-right">
                        ประเภทสัตว์
                    </div>
                    <div className="col-xs-6">
                        {item.animalType}
                    </div>
                </div>
                <div className="row section_vertical">
                    <div className="col-xs-4 text-right">
                        ชื่อสัตว์
                    </div>
                    <div className="col-xs-6">
                        {item.animalName}
                    </div>
                </div>
                <div className="row section_vertical">
                    <div className="col-xs-4 text-right">
                        สถานะ
                    </div>
                    <div className="col-xs-6">
                        {item.caseStatus}
                    </div>
                </div>
            </div>
        </div>
        <div className="panel-footer text-right">โดย {item.user.username}</div>
    </div>
)

 
export default CasePanel;