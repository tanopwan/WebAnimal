
import React from 'react';
 
// โหลดความสามารถของ react-router มาใช้งาน
import { Link } from 'react-router';

class App extends React.Component {
 
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
                {this.props.children}
            </div>
        );
   }
}
 
export default App;