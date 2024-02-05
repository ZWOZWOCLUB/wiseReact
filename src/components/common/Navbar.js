import { NavLink } from "react-router-dom";
import coreCSS from "../../@core/vendor/css/core.module.css"
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css"
import demoCSS from"../../@core/css/demo.module.css"

function Navbar(){

    return(

          <div id="layout-menu" className={[coreCSS[`layout-menu`], coreCSS[`menu-vertical`], coreCSS[`menu`], themDefaultCSS[`bg-menu-theme`]]} data-bg-class="bg-menu-theme">
            <NavLink to ='/index' className={[coreCSS[`app-brand-link`]]}>
              나중에 로고 이미지 넣기
            </NavLink>
            <div className={[coreCSS[`menu-inner-shadow`]]}></div>
              <ul className={[coreCSS[`menu-inner`], coreCSS[`py-1`]]}>
                <li className={coreCSS[`menu-item`]}>
                    <NavLink to ='index'> 홈</NavLink>
                </li>
                <li className={coreCSS[`menu-item`]}>
                  <NavLink to='/schedule/schedule'>스케줄</NavLink>
                </li>
                <li className={coreCSS[`menu-item`]}>
                    <NavLink to='/payment/annual'>결재</NavLink>
                </li>
                <li className={coreCSS[`menu-item`]}>
                    <NavLink to='/organizationChart/organizationChart'>부서</NavLink>
                </li>
                <li className={coreCSS[`menu-item`]}>
                    <NavLink to='/notice/noticeMain'>공지</NavLink>
                </li>
                <li className={coreCSS[`menu-item`]}>
                    <NavLink to='/formdata/formdata'>파일함</NavLink>
                </li>
                <li className={coreCSS[`menu-item`]}>
                    <NavLink to = '/pay/pay'>급여관리</NavLink>
                </li>
                <li className={[coreCSS[`menu-item`], coreCSS[`active`]]}>
                    <NavLink to ='/setting/allMemberList'>설정</NavLink>
                </li>
              </ul>
            </div>

    )
}

export default Navbar;