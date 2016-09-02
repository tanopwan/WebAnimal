import React from 'react';
import { FormControl } from 'react-bootstrap'

const CaseCard = ({username, caseName, imagePath}) => (
    <div className="card">
        <div className="cropthumbnail">
            <img src={imagePath}/>
        </div>
        <div className="container">
            <h3 style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{caseName}</h3>
            <h4 style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>โดย {username}</h4>
        </div>
    </div>
)

export default CaseCard;
