// โหลด React มาใช้งาน
import React from 'react'
import ReactDOM from 'react-dom';
 
// โหลดความสามารถของ react-router มาใช้งาน
import { Router, browserHistory } from 'react-router';
 
// โหลด route ต่างๆ ที่เราได้กำหนดไว้
import routes from './routes.jsx';

import FacebookButton from './components/FacebookButton.jsx';
 
 ReactDOM.render(
    <FacebookButton fb={FB} />, 
    document.getElementById('facebook')
);
// render ลงไปใน DOM ที่ #content
ReactDOM.render(
    <Router routes={routes} history={browserHistory} />, 
    document.getElementById('content')
);