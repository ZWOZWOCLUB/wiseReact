import coreCSS from "../../@core/vendor/css/core.module.css"
import themDefaultCSS from '../../@core/vendor/css/themeDefault.module.css';
import newCoreCss from "../../@core/vendor/css/newCore.module.css"

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { callLogoutAPI } from '../../apis/MemberAPICalls'

function Header(){

      //const isLogin = false;
      const navigate = useNavigate();

      // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
      const dispatch = useDispatch();
      const loginUser = useSelector(state => state.userReducer);  // 저장소에서 가져온 loginUser 정보
      const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
      const [isHovered, setIsHovered] = useState(false);
  
      const onClickLogoHandler = () => {
          // 로고 클릭시 메인 페이지로 이동
          navigate("/", { replace: true })
      }
  
      const handleIconClick = () => {
          // 클릭한 아이콘에 따라 다른 작업 수행
          console.log('Icon Clicked');
        };
  
  /*     const onClickMypageHandler = () => {    
  
          // 토큰이 만료되었을때 다시 로그인
          const token = decodeJwt(window.localStorage.getItem("accessToken"));
          console.log('[Header] onClickMypageHandler token : ', token);
          
          if (token.exp * 1000 < Date.now()) {
              setLoginModal(true);
              return ;
          }
  
          navigate("/mypage", { replace: true });
      } */
  
      const onClickLogoutHandler = () => {
          window.localStorage.removeItem('accessToken');  
          //로그아웃
          dispatch(callLogoutAPI());
          
          alert('로그아웃이 되어 메인화면으로 이동합니다.');
          navigate("/login", { replace: true })
          window.location.reload();
      }


    return(

      <nav
        className={`${coreCSS[`layout-navbar`]} ${coreCSS[`container-xxl`]} ${coreCSS[`navbar`]} ${coreCSS[`navbar-expand-xl`]} ${coreCSS[`navbar-detached`]} ${coreCSS[`align-items-center`]} ${themDefaultCSS[`bg-navbar-theme`]}`}
        id="layout-navbar"
      >
        <div className={`${coreCSS[`layout-menu-toggle`]} ${coreCSS[`navbar-nav`]} ${coreCSS[`align-items-xl-center`]} ${coreCSS[`me-3`]} ${coreCSS[`me-xl-0`]} ${coreCSS[`d-xl-none`]}`}>
          <a className={`${coreCSS[`nav-item`]} ${coreCSS[`nav-link`]} ${coreCSS[`px-0`]} ${coreCSS[`me-xl-4`]}`} href="javascript:void(0)">
            <i className={`${coreCSS[`bx`]} ${coreCSS[`bx-menu`]} ${coreCSS[`bx-sm`]}`}></i>
          </a>
        </div>

        <div className={`${coreCSS[`navbar-nav-right`]} ${coreCSS[`d-flex`]} ${coreCSS[`align-items-center`]}`} id="navbar-collapse">
          <div className={`${coreCSS[`navbar-nav`]} ${coreCSS[`align-items-center`]}`}>
            <div className={`${coreCSS[`nav-item`]} ${coreCSS[`d-flex`]} ${coreCSS[`align-items-center`]}`}>
              <i className={`${coreCSS[`bx`]} ${coreCSS[`bx-search`]} ${coreCSS[`fs-4`]} ${coreCSS[`lh-0`]}`}></i>
              <input
                type="text"
                className={`${coreCSS[`form-control`]} ${coreCSS[`border-0`]} ${coreCSS[`shadow-none`]}`}
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul className={`${coreCSS[`navbar-nav`]} ${coreCSS[`flex-row`]} ${coreCSS[`align-items-center`]} ${coreCSS[`ms-auto`]}`}>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              공지
            </li>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              알림
            </li>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}>
              쪽지
            </li>

            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`navbar-dropdown`]} ${coreCSS[`dropdown-user`]} ${coreCSS[`dropdown`]}`}>
              <a className={`${coreCSS[`nav-link`]} ${coreCSS[`dropdown-toggle`]} ${coreCSS[`hide-arrow`]}`} href="javascript:void(0);" data-bs-toggle="dropdown">
                <div className={`${coreCSS[`avatar`]} ${coreCSS[`avatar-online`]}`}>
                  <img src="../../assets/img/avatars/1.png" alt className={`${coreCSS[`w-px-40`]} ${coreCSS[`h-auto`]} ${coreCSS[`rounded-circle`]}`} />
                </div>
              </a>
              <ul className={`${coreCSS[`dropdown-menu`]} ${coreCSS[`dropdown-menu-end`]}`}>
                <li>
                  <a className={`${coreCSS[`dropdown-item`]}`} href="#">
                    <div className={`${coreCSS[`d-flex`]}`}>
                      <div className={`${coreCSS[`flex-shrink-0`]} ${coreCSS[`me-3`]}`}>
                        <div className={`${coreCSS[`avatar`]} ${coreCSS[`avatar-online`]}`}>
                          <img src="../../assets/img/avatars/1.png" alt className={`${coreCSS[`w-px-40`]} ${coreCSS[`h-auto`]} ${coreCSS[`rounded-circle`]}`} />
                        </div>
                      </div>
                      <div className={`${coreCSS[`flex-grow-1`]}`}>
                        <span className={`${coreCSS[`fw-semibold`]} ${coreCSS[`d-block`]}`}>John Doe</span>
                        <small className={`${coreCSS[`text-muted`]}`}>Admin</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className={`${coreCSS[`dropdown-divider`]}`}></div>
                </li>
                <li>
                  <a className={`${coreCSS[`dropdown-item`]}`} href="#">
                    <i className={`${coreCSS[`bx`]} ${coreCSS[`bx-user`]} ${coreCSS[`me-2`]}`}></i>
                    <span className={`${coreCSS[`align-middle`]}`}>My Profile</span>
                  </a>
                </li>
                <li>
                  <a className={`${coreCSS[`dropdown-item`]}`} href="#">
                    <i className={`${coreCSS[`bx`]} ${coreCSS[`bx-cog`]} ${coreCSS[`me-2`]}`}></i>
                    <span className={`${coreCSS[`align-middle`]}`}>출퇴근</span>
                  </a>
                </li>

                <li>
                  <div className={`${coreCSS[`dropdown-divider`]}`}></div>
                </li>
                <li>
                  <a className={`${coreCSS[`dropdown-item`]}`} href="auth-login-basic.html">
                    <i className={`${coreCSS[`bx`]} ${coreCSS[`bx-power-off`]} ${coreCSS[`me-2`]}`}></i>
                    <span className={`${coreCSS[`align-middle`]}`}>Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
          );
}

export default Header;