import React from 'react';
import { Link } from 'react-router';

import AccountMenu from './AccountMenu.jsx'

const MainMenu = () => (
    <div className="webanimal-page-header">
        <Link to='/'>หน้าแรก</Link>
        <Link to='/about'>เคสที่บันทึกไว้</Link>
        <Link to='/add_new_case'>เพิ่มเคสใหม่</Link>

        <AccountMenu />
    </div>
    
);

export default MainMenu;
