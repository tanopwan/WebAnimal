
import React from 'react';
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import { Link } from 'react-router';

import ModalRoot from './ModalPopup.jsx'
import LoginRoot from './ModalLogin.jsx'
import MainMenu from './MainMenu.jsx'

import { store } from '../redux/store.js'
import { fbModule } from '../facebook-init.js';
import * as Actions from '../redux/actions'
import { onGetFBLoginStatus } from '../services/user-services.js'

fbModule.subscribe((FB) => {
    FB.getLoginStatus(function (res) {
        store.dispatch(Actions.onFBInit());
        store.dispatch(onGetFBLoginStatus(res, Actions.onAuth, Actions.onUnAuth, Actions.onLogin, Actions.showLogin, Actions.showWarningModal));
    });
});

const AppConnect = ({children, store}) => (
<Provider store={store}>
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
                if (store.getState().errorObject.mainError.hasError == true) {
                    return (<div className="alert alert-danger">
                        {store.getState().errorObject.mainError.message}
                    </div>);
                }
            })(store)}
            {children}
            <ModalRoot />
            <LoginRoot />
        </div>
    </div>
</Provider>
);

const mapStateToProps = (state) => {
    return { }
}

function connectWithStore(store, WrappedComponent, ...args) {
    var App = connect(...args)(WrappedComponent)
    return function (props) {
        return <App {...props} store={store} />
    }
}

const App = connectWithStore(store, AppConnect, mapStateToProps)

export default App;
