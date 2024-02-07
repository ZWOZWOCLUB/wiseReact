import coreCSS from "../../@core/vendor/css/core.module.css"
import themDefaultCSS from '../../@core/vendor/css/themeDefault.module.css';
import newCoreCss from "../../@core/vendor/css/newCore.module.css"
import '../../pages/alarmAndMessage/message.css';
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import React, { useState } from 'react';
<script async defer src="https://buttons.github.io/buttons.js"></script>
function Header(){
  const [tab, setTab] = useState('sended'); // State to keep track of the active tab

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
  };


    return(

      <>
      
{/* 파비콘 */}
<link rel="icon" type="image/x-icon" href="../../assets/img/favicon/favicon.ico" />

{/* Fonts */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
  rel="stylesheet"
/>

{/* Icons */}
<link rel="stylesheet" href="../../assets/vendor/fonts/boxicons.css" />

{/* Core CSS */}
<link rel="stylesheet" href="../../assets/vendor/css/core.css" className="template-customizer-core-css" />
<link rel="stylesheet" href="../../assets/vendor/css/theme-default.css" className="template-customizer-theme-css" />
<link rel="stylesheet" href="../../assets/css/demo.css" />

{/* Vendors CSS */}
<link rel="stylesheet" href="../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

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
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasEnd"
            onClick={() => handleTabChange('sended')}
            >
              알림
            </li>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${coreCSS[`me-3`]}`}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasEnd1"
            onClick={() => handleTabChange('sended')}
            >
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

{/* 알림함 시작 */}
        <div
                          className="offcanvas offcanvas-end"
                          tabindex="-1"
                          id="offcanvasEnd"
                          aria-labelledby="offcanvasEndLabel"
                        >
                          <div className="offcanvas-header">
                            <h5 id="offcanvasEndLabel" className="offcanvas-title">알림함</h5>
                            <button
                              type="button"
                              className="btn-close text-reset"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>


                          <div className="offcanvas-body my-auto mx-0 flex-grow-0" style={{overflowY: 'auto', height: '95%' }}>
                          <div className="tabs">
  <ul>
    <div style={{
      marginBottom:'10px',
      height:'25px',
        }}>
    <li>
      <span
        onClick={() => handleTabChange('sended')}
        style={{
          cursor: 'pointer',
          color: tab === 'sended' ? 'blue' : 'black', // Example color change
          fontWeight: tab === 'sended' ? 'bold' : 'normal', // Example font weight change
          margin:'0px 0px 0px 50px',
        }}
      >
        전체 알람
      </span>
    </li>
    <li>
      <span
        onClick={() => handleTabChange('sending')}
        style={{
          cursor: 'pointer',
          color: tab === 'sending' ? 'blue' : 'black', // Example color change
          fontWeight: tab === 'sending' ? 'bold' : 'normal', // Example font weight change
          margin:'0px 0px 0px 65px',
        }}
      >
        개인 알람
      </span>
    </li>

    </div>
  </ul>
</div>

                            {tab === 'sended' && (
                              <div>
                                <div className="offcanvas-body my-auto mx-0 flex-grow-0"
                                style={{
                                  padding:'10px 10px 0px 10px',
                                }}>
                            <div className="btn btn-outline-secondary d-grid w-100"
                            style={{
                              textAlign:'left',
                            }}
                            >홍길동님의 연차 결재 서류에 참고인으로 설정되었습니다.</div>
                          </div>
                              </div>
                            )}

                            {tab === 'sending' && (
                              <div>
                                {/* Content for sending tab */}
                                <div className="offcanvas-body my-auto mx-0 flex-grow-0"
                                style={{
                                  padding:'10px 10px 0px 10px',
                                }}>
                            <div className="btn btn-outline-secondary d-grid w-100"
                            style={{
                              textAlign:'left',
                            }}>홍길동님의 연차 결재 서류</div>
                          </div>
                              </div>
        
                            )}
                            
                          </div>
                        </div>
                        {/* 알림함 끝 */}

                        {/* 메신저 시작 */}
                        <div
                          className="offcanvas offcanvas-end"
                          tabindex="-1"
                          id="offcanvasEnd1"
                          aria-labelledby="offcanvasEndLabel"
                        >
                          <div className="offcanvas-header">
                            <h5 id="offcanvasEndLabel" className="offcanvas-title">쪽지함</h5>
                            <button
                              type="button"
                              className="btn-close text-reset"
                              data-bs-dismiss="offcanvas"
                              aria-label="Close"
                            ></button>
                          </div>


                          <div className="offcanvas-body my-auto mx-0 flex-grow-0" style={{overflowY: 'auto', height: '95%' }}>
                          <div className="tabs">
  <ul>
    <div style={{
      marginBottom:'10px',
      height:'25px',
        }}>
    <li>
      <span
        onClick={() => handleTabChange('sended')}
        style={{
          cursor: 'pointer',
          color: tab === 'sended' ? 'blue' : 'black', // Example color change
          fontWeight: tab === 'sended' ? 'bold' : 'normal', // Example font weight change
        }}
      >
        받은 내역
      </span>
    </li>
    <li>
      <span
        onClick={() => handleTabChange('sending')}
        style={{
          cursor: 'pointer',
          color: tab === 'sending' ? 'blue' : 'black', // Example color change
          fontWeight: tab === 'sending' ? 'bold' : 'normal', // Example font weight change
          margin:'0px 35px 0px 40px',
        }}
      >
        보낸 내역
      </span>
    </li>
    <li>
      <span
        onClick={() => handleTabChange('newWrite')}
        style={{
          cursor: 'pointer',
          color: tab === 'newWrite' ? 'blue' : 'black', // Example color change
          fontWeight: tab === 'newWrite' ? 'bold' : 'normal', // Example font weight change
        }}
      >
        새 글 쓰기
      </span>
    </li>
    </div>
  </ul>
</div>

                            {tab === 'sended' && (
                              <div style={{
                                marginTop:'10px',
                                height:'25px',
                                  }}>
                                <div className="messageBox"
                                style={{
                                  textAlign:'left',
                                }}
                                >
                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>2023.03.12 &nbsp;&nbsp;&nbsp; 14:01</div>
                                    <div><button style={{border:'solid 0px', backgroundColor: '#fff', cursor: 'pointer'}}>X</button></div>
                                  </div>
                                  <div>결재 서류 확인 부탁드립니다.</div>
                                  <div>발신자 : 기린</div>
                                </div>
                              
                 
                              </div>
                            )}

                            {tab === 'sending' && (
                              <div style={{
                                marginTop:'10px',
                                height:'25px',
                                  }}>
                                {/* Content for sending tab */}
                                <div className="messageBox"
                                 style={{
                                  textAlign:'left',
                                }}>
                                  <div>2023.01.17 &nbsp;&nbsp;&nbsp; 09:30</div>
                                  <div>수신자 : 간호 1팀 얼룩말</div>
                                  <div>오늘 나 병원가야해서 반차쓸거야</div>
                                </div>
                              
                              </div>
        
                            )}
                            {tab === 'newWrite' && (
                              <div style={{
                                marginTop:'10px',
                                height:'25px',
                                  }}>
                                 <div>
                                    <div>수신자</div>
                                    <input id="receiver" type="button" data-bs-toggle="modal" data-bs-target="#modalCenter"/>
                                    <div class="col-lg-4 col-md-6">
                                      <div className="mt-3">
                                        {/* <div className="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
                                          <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title" id="modalCenterTitle">수신자 선택</h5>
                                                <button
                                                  type="button"
                                                  className="btn-close"
                                                  data-bs-dismiss="modal"
                                                  aria-label="Close"
                                                ></button>
                                              </div>
                                              <div className="modal-body">
                                                <div className="row">
                                                  <div className="col mb-3">
                                                    <label for="nameWithTitle" className="form-label">조직도가 보여질 화면</label>
                                                    <input
                                                      type="text"
                                                      id="nameWithTitle"
                                                      className="form-control"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col mb-3">
                                                    <label for="nameWithTitle" className="form-label">변경할 비밀번호</label>
                                                    <input
                                                      type="text"
                                                      id="nameWithTitle"
                                                      className="form-control"
                                                    />
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col mb-3">
                                                    <label for="nameWithTitle" className="form-label">변경할 비밀번호 재입력</label>
                                                    <input
                                                      type="text"
                                                      id="nameWithTitle"
                                                      className="form-control"
                                                    />
                                                  </div>
                                                </div>

                                              </div>
                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                                  닫기
                                                </button>
                                                <button type="button" className="btn btn-primary">선택</button>
                                              </div>
                                            </div>
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <div>내용</div>
                                    <input id="content" type="text"/>
                                  </div>
                                  <button
                                    className="btn btn-primary"
                                    type="button"
                                    style={{
                                      marginTop:'10px',
                                      height:'50px',
                                      marginLeft:'250px',
                                      backgroundColor:'#5f61e6',
                                      color:'beige',
                                      width:'100px'

                                        }}
                                  >
                                  보내기
                                  </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* 메신저 끝 */}



      </nav>






      </>

          );
}

export default Header;