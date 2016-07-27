import React from 'react';
import CaseCard from './CaseCard.jsx';
//import CaseServices from '../services/case-services.js';
import CaseContainer from './CaseContainer.jsx';

class ViewCaseContainer extends React.Component {

	constructor(props) {
		super(props);

        this.state = {
            filters: {}
        }
	}

    componentDidMount() {
    }

    filterAnimalType (event) {
        var animalTypes = $("button.active[name='filterAnimalType']").map(function(){
            return $(this).val();
        }).get();
        var self = this;
        this.setState({filters: {
            animalTypes: animalTypes
        }});
    }

    render() {
        return (
            <div>
                <div className="col-xs-12">
                    <div className="btn-group" data-toggle="buttons-checkbox">
                        <button type="button" name="filterAnimalType" value="cat" className="btn btn-warning" onClick={this.filterAnimalType.bind(this)}>Cat</button>
                        <button type="button" name="filterAnimalType" value="dog" className="btn btn-warning" onClick={this.filterAnimalType.bind(this)}>Dog</button>
                        <button type="button" name="filterAnimalType" value="others" className="btn btn-warning" onClick={this.filterAnimalType.bind(this)}>Other</button>
                    </div>
                </div>
                <div className="col-xs-12">
                    <CaseContainer filters={this.state.filters}/>
                </div>
            </div>
        );
    }
}

export default ViewCaseContainer;
