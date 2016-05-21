
import React from 'react';
 
// โหลดความสามารถของ react-router มาใช้งาน
import { Link } from 'react-router';
import FacebookButton from './FacebookButton.jsx';

class App extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            userObject: {
                fbId: "",
                username: ""
            },
            errorObject: null
        };
    }

    _onLogin(object) {
        console.log("_onLogin: " + JSON.stringify(object));
        if (object.code == 200) {
            this.setState({
                userObject: object
            });
        }
        else {
            this.setState({
                errorObject: object
            });
        }
    }

    render() {
        return (
            <div>
                <div className="pull-right">
                    <FacebookButton onLogin={this._onLogin.bind(this)}/>
                </div>
                <ul className="nav nav-pills">
                    <li><Link to='/'>Home</Link></li>
    				<li><Link to='/about'>About</Link></li>
    				<li><Link to='/add_new_case'>A D D</Link></li>
    				<li><Link to='/account'>A C C O U N T</Link></li>
                    <li><Link to='/mycases'>M Y C A S E S</Link></li>
                </ul>
                {React.cloneElement(this.props.children, { userObject: this.state.userObject.object, errorObject: this.state.errorObject})}
            </div>
        );
   }
}

App.propTypes = {
    userObject: React.PropTypes.object
}

App.defaultProps = {
    userObject: {
        object: {
            fbId: "",
            username: ""
        }
    }
}
 
export default App;