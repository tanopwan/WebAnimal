
import React from 'react';
 
// โหลดความสามารถของ react-router มาใช้งาน
import { Link } from 'react-router';
import FacebookButton from './FacebookButton.jsx';

class App extends React.Component {
 
    constructor(props) {
        super(props);

        this.state = {
            userObject: {},
            err: false,
            errorObject: null
        };
    }

    componentDidMount() {
        console.log("componentDidMount{App}");
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

    setAppErrorState(errorObject) {
        this.setState({
            err: true,
            errorObject: errorObject
        }, function() {
            console.log("setAppErrorState: " + JSON.stringify(errorObject));
        });
    }

    resetAppErrorState() {
        this.setState({
            err: false,
            errorObject: null
        })
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                callbacks: [{setError: this.setAppErrorState.bind(this), resetError: this.resetAppErrorState.bind(this)}],
                setError: "!111",
                userObject: this.state.userObject.object
            })
        );
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

                {(function(error, self) {
                    if (error == 1) {
                        return (<div className="alert alert-danger">
                                    {JSON.stringify(self.props.errorObject)}
                                </div>);
                    }
                })(this.state.err, this)}
                {childrenWithProps}
            </div>
        );
   }
}
 
export default App;