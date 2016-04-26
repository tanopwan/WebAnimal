
import React from 'react';
 
// โหลดความสามารถของ react-router มาใช้งาน
import { Link } from 'react-router';
import FacebookButton from './FacebookButton.jsx';

class App extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            fb: {
                fbId: "",
                username: ""
            }
        };
    }

    _onLogin(object) {
        console.log("_onLogin: " + JSON.stringify(object));
        
        this.setState({
            fb: object
        });
        console.log(this.state.fb.username);
    }

    // ใส่ link ไปยังหน้า Home และ About
    render() {
        return (
            <div>
                <ul className="nav nav-pills">
                    <li><Link to='/'>Home</Link></li>
    				<li><Link to='/about'>About</Link></li>
    				<li><Link to='/add_new_case'>A D D</Link></li>
    				<li><Link to='/account'>A C C O U N T</Link></li>
                </ul>
                <div className="pull-right">
                    <FacebookButton onLogin={this._onLogin.bind(this)}/>
                </div>
                {React.cloneElement(this.props.children, { value: this.state.fb.username })}
            </div>
        );
   }
}
 
export default App;