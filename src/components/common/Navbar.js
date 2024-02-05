import React from 'react';
import { NavLink } from 'react-router-dom';
import coreCSS from './Navbar.module.css';
import themDefaultCSS from '../../@core/vendor/css/themeDefault.module.css';
function Navbar() {
  return (
        <div id="layout-menu" className={`${coreCSS[`layout-menu`]} ${coreCSS[`menu-vertical`]} ${coreCSS[`menu`]} ${themDefaultCSS[`bg-menu-theme`]}`}>
          <NavLink to ="../../pages/Main.js" className={`${coreCSS[`app-brand-link`]}`}>
            <img
              src="../../@core/img/icons/unicons/logo.png"
              alt=""
              style={{ paddingTop: 30, paddingBottom: 30 }}
            />
          </NavLink>
          <div className={`${coreCSS[`menu-inner-shadow`]}`} />
          <ul className={`${coreCSS[`menu-inner`]} ${coreCSS[`py-1`]}`}>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to ="../../pages/Main.js" className={`${coreCSS[`menu-link`]}`}>
                <div style={{ width: 40 }}/>
                <div style={{ paddingLeft: 10 }}>홈</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to = "../../pages/schedule/schedule" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>
                <div style={{ paddingLeft: 10 }}>스케줄</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to ="../../pages/payment/payment" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>

                <div style={{ paddingLeft: 10 }}>결재</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to ="../../pages/organizationChart/organizationChart" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>

                <div style={{ paddingLeft: 10 }}>부서</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to ="../../pages/notice/noticeMain" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>

                <div style={{ paddingLeft: 10 }}>공지</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to = "../../pages/fromdata/formdata" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>

                <div style={{ paddingLeft: 10 }}>파일함</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]} `}>
              <NavLink to = "../../pages/pay/pay" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>

                <div style={{ paddingLeft: 10 }}>급여관리</div>
              </NavLink>
            </li>
            <li className={`${coreCSS[`menu-item`]}`}>
              <NavLink to = "../../pages/setting/allMemberList" className={`${coreCSS[`menu-link`]}`}>
              <div style={{ width: 40 }}/>

                <div style={{ paddingLeft: 10 }}>설정</div>
              </NavLink>
            </li>
          </ul>
        
      </div>
  );
}

export default Navbar;
