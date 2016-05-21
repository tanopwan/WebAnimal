
import React from 'react';
 
// โหลดความสามารถของ react-router มาใช้งาน
import { Route, IndexRoute } from 'react-router';
 
// โหลด component ต่างๆ
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import AddNewCase from './components/AddNewCase.jsx';
import Account from './components/Account.jsx';
import MyCases from './components/MyCases.jsx';

import CaseContainer from './components/CaseContainer.jsx';
 
// ระบุว่า path นี้จะถูก handle ด้วย component ไหน
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="add_new_case" component={AddNewCase}/>
        <Route path="account" component={Account}/>
        <Route path="mycases" component={MyCases}>
        	<IndexRoute component={CaseContainer}/>
        </Route>

    </Route>
);