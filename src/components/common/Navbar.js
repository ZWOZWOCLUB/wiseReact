import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import coreCSS from "./Navbar.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import logo from "../../@core/img/icons/unicons/logo.png";
import home from "../../@core/img/icons/unicons/home.png";
import notice from "../../@core/img/icons/unicons/notice.png";
import approval from "../../@core/img/icons/unicons/approval.png";
import document from "../../@core/img/icons/unicons/document.png";
import schedule from "../../@core/img/icons/unicons/schedule.png";
import setting from "../../@core/img/icons/unicons/setting.png";
import pay from "../../@core/img/icons/unicons/pay.png";
import organization from "../../@core/img/icons/unicons/organization .png";
import "../../assets/vendor/js/menu.js";
import "../../assets/vendor/js/helpers.js";
import { useState } from "react";



function Navbar() {

    const location = useLocation();


    const [openedMenu, setOpenedMenu] = useState('')



    const menuPaths = {
      dep: ["/main/organizationChart", "/main/organizationTree"],
      app: ["/main/Approval", "/main/SendApproval", "/main/Assignment"],
      not: ["/main/notice", "main/NoticeWrite"],
      doc: ["/main/dataformat"],
      pay: ["/main/pay"],
      set: ["/main/setting", "/main/memberAdd", "/main/settingAttendance" ],
    }

    useEffect(() => {
      Object.keys(menuPaths).forEach(menuKey => {
        if (menuPaths[menuKey].some(path => location.pathname.includes(path))) {
          setOpenedMenu(menuKey);
        }
      });
    }, [location]);

    const toggleMenu = (menuKey) => {
      setOpenedMenu(prevMenuKey => prevMenuKey === menuKey ? '' : menuKey);
    };




  return (
    <div
      id="layout-menu"
      className={`${coreCSS[`layout-menu`]} ${coreCSS[`menu-vertical`]} ${
        coreCSS[`menu`]
      } ${themDefaultCSS[`bg-menu-theme`]}`}
    >
      <NavLink to="/main" className={`${coreCSS[`app-brand-link`]}`}>
        <img src={logo} style={{ paddingTop: 30, paddingBottom: 30 }} />
      </NavLink>
      <div className={`${coreCSS[`menu-inner-shadow`]}`} />
      <ul className={`${coreCSS[`menu-inner`]} ${coreCSS[`py-1`]}`}>
        <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink to="/main" className={`${coreCSS[`menu-link`]}`}>
            <img src={home} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>홈</div>
          </NavLink>
        </li>
        <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink to="/main/schedule" className={`${coreCSS[`menu-link`]}`}>
            <img src={schedule} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>스케줄</div>
          </NavLink>
        </li>
        {/* <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink to="/main/approval" className={`${coreCSS[`menu-link`]}`}>
            <img src={approval} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>결재</div>
          </NavLink>
        </li>
        <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink
            to="/main/organizationChart"
            className={`${coreCSS[`menu-link`]}`}
          >
            <img src={organization} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>부서</div>
          </NavLink>
        </li>
        <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink to="/main/notice" className={`${coreCSS[`menu-link`]}`}>
            <img src={notice} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>공지</div>
          </NavLink>
        </li>
        <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink to="/main/dataformat" className={`${coreCSS[`menu-link`]}`}>
            <img src={document} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>파일함</div>
          </NavLink>
        </li>
        <li className={`${coreCSS[`menu-item`]} `}>
          <NavLink to="/main/pay" className={`${coreCSS[`menu-link`]}`}>
            <img src={pay} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>급여관리</div>
          </NavLink>
        </li>
        <li className={`${coreCSS[`menu-item`]}`}>
          <NavLink to="/main/setting" className={`${coreCSS[`menu-link`]}`}>
            <img src={setting} style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>설정</div>
          </NavLink>
        </li> */}


        <li className={`${coreCSS['menu-item']} ${openedMenu === 'app' ? coreCSS['open'] : ''}`} onClick={() => toggleMenu('app')}>
          <div className={`${coreCSS[`menu-link`]} ${coreCSS[`menu-toggle`]}`}>
            <img src={approval} alt="" style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>결재</div>
          </div>
          <ul className={coreCSS[`menu-sub`]}>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/Approval" className={coreCSS[`menu-link`]}>
                받은 결재
              </NavLink>
            </li>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/SendApproval" className={coreCSS[`menu-link`]}>
                보낸 결재
              </NavLink>
            </li>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/Assignment" className={coreCSS[`menu-link`]}>
                전결자 지정
              </NavLink>
            </li>
          </ul>
        </li>


        <li className={`${coreCSS['menu-item']} ${openedMenu === 'dep' ? coreCSS['open'] : ''}`} onClick={() => toggleMenu('dep')}>
          <div className={`${coreCSS[`menu-link`]} ${coreCSS[`menu-toggle`]}`}>
            <img src={organization} alt="" style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>부서</div>
          </div>
          <ul className={coreCSS[`menu-sub`]}>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/organizationChart" className={coreCSS[`menu-link`]}>
                부서 조회
              </NavLink>
            </li>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/organizationTree" className={coreCSS[`menu-link`]}>
                조직도
              </NavLink>
            </li>
          </ul>
        </li>

        <li className={`${coreCSS['menu-item']} ${openedMenu === 'not' ? coreCSS['open'] : ''}`} onClick={() => toggleMenu('not')}>
          <div className={`${coreCSS[`menu-link`]} ${coreCSS[`menu-toggle`]}`}>
            <img src={notice} alt="" style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>공지</div>
          </div>
          <ul className={coreCSS[`menu-sub`]}>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/notice" className={coreCSS[`menu-link`]}>
                공지사항
              </NavLink>
            </li>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/NoticeWrite" className={coreCSS[`menu-link`]}>
                공지작성
              </NavLink>
            </li>
          </ul>
        </li>

        <li className={`${coreCSS['menu-item']} ${openedMenu === 'doc' ? coreCSS['open'] : ''}`} onClick={() => toggleMenu('doc')}>
          <div className={`${coreCSS[`menu-link`]} ${coreCSS[`menu-toggle`]}`}>
            <img src={document} alt="" style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>자료실</div>
          </div>
          <ul className={coreCSS[`menu-sub`]}>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/dataformat" className={coreCSS[`menu-link`]}>
                서식자료실
              </NavLink>
            </li>
          </ul>
        </li>

        <li className={`${coreCSS['menu-item']} ${openedMenu === 'pay' ? coreCSS['open'] : ''}`} onClick={() => toggleMenu('pay')}>
          <div className={`${coreCSS[`menu-link`]} ${coreCSS[`menu-toggle`]}`}>
            <img src={pay} alt="" style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>급여</div>
          </div>
          <ul className={coreCSS[`menu-sub`]}>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/pay" className={coreCSS[`menu-link`]}>
                급여명세서
              </NavLink>
            </li>
          </ul>
        </li>

        <li className={`${coreCSS['menu-item']} ${openedMenu === 'set' ? coreCSS['open'] : ''}`} onClick={() => toggleMenu('set')}>
          <div className={`${coreCSS[`menu-link`]} ${coreCSS[`menu-toggle`]}`}>
            <img src={setting} alt="" style={{ width: 40 }} />
            <div style={{ paddingLeft: 10 }}>설정</div>
          </div>
          <ul className={coreCSS[`menu-sub`]}>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/setting" className={coreCSS[`menu-link`]}>
                전체 직원 조회
              </NavLink>
            </li>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/memberAdd" className={coreCSS[`menu-link`]}>
                직원 등록
              </NavLink>
            </li>
            <li className={coreCSS[`menu-item`]}>
              <NavLink to="/main/settingAttendance" className={coreCSS[`menu-link`]}>
                근태 조회
              </NavLink>
            </li>
          </ul>
        </li>

      </ul>
    </div>
  );
}
return(
  <>
  {isLogin == null || isLogin === undefined ? <BeforeLogin /> : <AfterLogin />}
  </>
);
}
export default Navbar;
