
import React from 'react';
import { Provider } from 'react-redux'
import { Link } from 'react-router';

import ModalRoot from './ModalPopup.jsx'
import LoginRoot from './ModalLogin.jsx'
import FacebookController from './FacebookController.jsx'
import MainMenu from './MainMenu.jsx'

import { store } from '../redux/stores'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.store = store;
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => { this.forceUpdate()});
        //this.store.subscribe(() => { console.log("APP Subscribe: " + JSON.stringify(this.store.getState())) });
    }

    componentDidUnMount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <MainMenu />
                    <div>
                        <ul className="nav nav-pills">
                            <li><Link to='/'>Home</Link></li>
            				<li><Link to='/about'>About</Link></li>
            				<li><Link to='/add_new_case'>A D D</Link></li>
            				<li><Link to='/account'>A C C O U N T</Link></li>
                            <li><Link to='/mycases'>M Y C A S E S</Link></li>
                            <li><Link to='/dev'>D E V</Link></li>
                        </ul>
                        {(function(error, self) {
                            if (error == true) {
                                return (<div className="alert alert-danger">
                                            {self.store.getState().errorObject.mainError.message}
                                        </div>);
                            }
                        })(this.store.getState().errorObject.mainError.hasError, this)}
                        {this.props.children}
                        <ModalRoot />
                        <FacebookController />
                        <LoginRoot />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;
