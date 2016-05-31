
import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { Link } from 'react-router';
import FacebookButton from './FacebookButton.jsx';

import { store } from '../redux/stores'

class App extends React.Component {
 
    constructor(props) {
        super(props);

        this.store = store;
    }

    componentDidMount() {
        console.log("componentDidMount{App}");
        this.unsubscribe = this.store.subscribe(() => { this.forceUpdate()});
        this.store.subscribe(() => { console.log(this.store.getState()) });
    }

    componentDidUnMount() {
        console.log("componentDidUnMount{App}");
        this.unsubscribe();
    }

    render() {
        //console.log("APP render:" + this.store.getState().errorObject.mainError.hasError);
        return (
            <Provider store={this.store}>
                <div>
                    <div className="pull-right">
                        <FacebookButton />
                    </div>
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
                </div>
            </Provider>
        );
   }
}
 
export default App;