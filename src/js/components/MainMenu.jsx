import React from 'react';
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router';

const MainMenu = () => (
    <div className="webanimal-page-header">
        <Link to='/'>หน้าแรก</Link>
        <Link to='/about'>เคสที่บันทึกไว้</Link>
        <Link to='/add_new_case'>เพิ่มเคสใหม่</Link>

        <div className="dropdown pull-right">
            <button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown">
                <img src="https://graph.facebook.com/v2.6/1199019910116181/picture" /> Dropdown Example <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
                <li><Link to="/">ข้อมูลส่วนตัว</Link></li>
                <li><Link to="/">เปลี่ยนรหัสผ่าน</Link></li>
                <li><Link to="/">ออกจากระบบ</Link></li>
            </ul>
        </div>
    </div>
    
);

export default MainMenu;
