import './message.css';
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import React, { useState } from 'react';
<script async defer src="https://buttons.github.io/buttons.js"></script>

function Message3(){

  const [tab, setTab] = useState('sended'); // State to keep track of the active tab

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
  };

    return (
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

<button 
className="nav-item lh-1 me-3"
data-bs-toggle="offcanvas"
data-bs-target="#offcanvasEnd2"
onClick={() => handleTabChange('sended')}>알림함</button>

                    <div className="col-lg-3 col-md-6">
                      <div className="mt-3">
                        <div
                          className="offcanvas offcanvas-end"
                          tabindex="-1"
                          id="offcanvasEnd2"
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
                                <div className="offcanvas-body my-auto mx-0 flex-grow-0">
                            <div className="btn btn-outline-secondary d-grid w-100">홍길동님의 연차 결재 서류에 참고인으로 설정되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">스케줄 변경 서류가 승인되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">새로운 스케줄이 등록되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">코뿔소님의 출퇴근 정정 결재에 결재자로 등록되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">스케줄 변경 서류가 반려되었습니다.</div>
                          </div>
                              </div>
                            )}

                            {tab === 'sending' && (
                              <div>
                                {/* Content for sending tab */}
                                <div className="offcanvas-body my-auto mx-0 flex-grow-0">
                            <div className="btn btn-outline-secondary d-grid w-100">홍길동님의 연차 결재 서류</div>
                            <div className="btn btn-outline-secondary d-grid w-100">스케류가 승인되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">새로운 스케류가되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">코뿔소님의 출퇴근 결재자로 등록되었습니다.</div>
                            <div className="btn btn-outline-secondary d-grid w-100">스케줄 려되었습니다.</div>
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
                                        <div className="modal fade" id="modalCenter" tabindex="-1" aria-hidden="true">
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
                                        </div>
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
                                      marginLeft:'270px',
                                      backgroundColor:'#5f61e6',
                                      color:'beige',

                                        }}
                                  >
                                  보내기
                                  </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
        </>
    )
}

function Message1(){
  const [tab, setTab] = useState('sended'); // State to keep track of the active tab

  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
  };
  return (
    <>
 <div>
      {/* Assuming you have some way to trigger tab changes, for example, buttons or links */}
      <button onClick={() => handleTabChange('alarm')}>Alarm</button>
      <button onClick={() => handleTabChange('sended')}>Sended</button>
      <button onClick={() => handleTabChange('sending')}>Sending</button>
      <button onClick={() => handleTabChange('newWrite')}>New Write</button>

      {/* Rendering content based on the active tab */}
      {tab === 'sended' && (
        <div className="messageBox">
          {/* Content for sended tab */}
          탭
        </div>
      )}
      {tab === 'sending' && (
        <div className="messageBox">
          {/* Content for sending tab */}
          탭2
        </div>
        
      )}
      {tab === 'newWrite' && (
        <div className="messageBox">
          {/* Content for newWrite tab */}
          탭3
        </div>
      )}
    </div>
    </>
  )
}
export default Message3;