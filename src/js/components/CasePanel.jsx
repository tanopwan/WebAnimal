import React from 'react';

class CasePanel extends React.Component {

	constructor(props) {
		super(props);

        this.state = {
            item : {
                user: {},
                caseName: ""    
            }
        }
	}

	componentWillReceiveProps(props) {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.item.caseName}</div>
                <div className="panel-body">Panel Content</div>
                <div className="panel-footer">Panel Footer</div>
            </div>
        );
    }
}

CasePanel.defaultProps = {
    item: {
        caseName: ""
    }
}
 
export default CasePanel;