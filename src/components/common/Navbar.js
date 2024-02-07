import React from 'react';
import { NavLink } from 'react-router-dom';
import coreCSS from './Navbar.module.css';
import themDefaultCSS from '../../@core/vendor/css/themeDefault.module.css';
import logo from '../../@core/img/icons/unicons/logo.png';
import home from '../../@core/img/icons/unicons/home.png';
import notice from '../../@core/img/icons/unicons/notice.png';
import approval from '../../@core/img/icons/unicons/approval.png';
import document from '../../@core/img/icons/unicons/document.png';
import schedule from '../../@core/img/icons/unicons/schedule.png';
import setting from '../../@core/img/icons/unicons/setting.png';
import pay from '../../@core/img/icons/unicons/pay.png';
import organization from '../../@core/img/icons/unicons/organization .png';

function Navbar() {
    return (
        <div
            id='layout-menu'
            className={`${coreCSS[`layout-menu`]} ${coreCSS[`menu-vertical`]} ${coreCSS[`menu`]} ${
                themDefaultCSS[`bg-menu-theme`]
            }`}
        >
            <NavLink to='/' className={`${coreCSS[`app-brand-link`]}`}>
                <img src={logo} style={{ paddingTop: 30, paddingBottom: 30 }} />
            </NavLink>
            <div className={`${coreCSS[`menu-inner-shadow`]}`} />
            <ul className={`${coreCSS[`menu-inner`]} ${coreCSS[`py-1`]}`}>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='/' className={`${coreCSS[`menu-link`]}`}>
                        <img src={home} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>홈</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='/schedule' className={`${coreCSS[`menu-link`]}`}>
                        <img src={schedule} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>스케줄</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='/approval' className={`${coreCSS[`menu-link`]}`}>
                        <img src={approval} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>결재</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='../../pages/organizationChart/organizationChart' className={`${coreCSS[`menu-link`]}`}>
                        <img src={organization} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>부서</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='../../pages/notice/noticeMain' className={`${coreCSS[`menu-link`]}`}>
                        <img src={notice} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>공지</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='../../pages/fromdata/formdata' className={`${coreCSS[`menu-link`]}`}>
                        <img src={document} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>파일함</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]} `}>
                    <NavLink to='/pay' className={`${coreCSS[`menu-link`]}`}>
                        <img src={pay} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>급여관리</div>
                    </NavLink>
                </li>
                <li className={`${coreCSS[`menu-item`]}`}>
                    <NavLink to='/setting' className={`${coreCSS[`menu-link`]}`}>
                        <img src={setting} style={{ width: 40 }} />
                        <div style={{ paddingLeft: 10 }}>설정</div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
