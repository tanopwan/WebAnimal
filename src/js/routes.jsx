
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
import CasePage from './components/CasePage.jsx';
import DevPanel from './components/DevPanel.jsx';

import CaseContainer from './components/CaseContainer.jsx';
import CaseDetail from './components/CaseDetail.jsx';
import FormEditCase from './components/FormEditCase.jsx';
 
//
// ระบุว่า path นี้จะถูก handle ด้วย component ไหน
export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="add_new_case" component={AddNewCase}/>
        <Route path="account" component={Account}/>
        <Route path="mycases" component={MyCases}>
        </Route>
        <Route path="case" component={CasePage}>
        	<Route path="view/:id" component={CaseDetail}/>
            <Route path="edit/:id" component={FormEditCase}/>
        </Route>
        <Route path="dev" component={DevPanel}/>
    </Route>
);