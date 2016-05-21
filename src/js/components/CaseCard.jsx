import React from 'react';
import { FormControl } from 'react-bootstrap'

class CaseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : ""
        };
    }

    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps{CaseCard}: props" + JSON.stringify(props));
        this.setState({value: props.value});
    }

    componentDidMount() {
        console.log("componentDidMount{CaseCard}: this.props" + JSON.stringify(this.props));
        this.setState({value: this.props.value});
    }

    render() {
        return (
            <div className="card">
                <div className="cropthumbnail">
                    <img src={this.props.item.imagePath}/>
                </div>
                <div className="container">
                    <h3 style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{this.props.item.caseName}</h3>
                    <h4 style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>โดย {this.props.item.user.username}</h4>
                </div>
            </div>
        );
    }
}

CaseCard.defaultProps = {
    item: {
        imagePath: "",
        caseName: "",
        user: {
            username: ""
        }
    }
}
 
export default CaseCard;