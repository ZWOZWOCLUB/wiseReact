import './message.css';
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import React, { useState } from 'react';
<script async defer src="https://buttons.github.io/buttons.js"></script>

function Message(){

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
data-bs-target="#offcanvasEnd4"
onClick={() => handleTabChange('sended')}>메신저</button>

                    <div className="col-lg-3 col-md-6">
                      <div className="mt-3">

                        {/* 사이드바 시작 */}
                        <div
                          className="offcanvas offcanvas-end"
                          tabindex="-1"
                          id="offcanvasEnd4"
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
          margin:'0px 43px 0px 43px',
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
                                <div className="messageBox">
                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>2023.03.12 &nbsp;&nbsp;&nbsp; 14:01</div>
                                    <div><button style={{border:'solid 0px', backgroundColor: '#fff', cursor: 'pointer'}}>X</button></div>
                                  </div>
                                  <div>결재 서류 확인 부탁드립니다.</div>
                                  <div>발신자 : 기린</div>
                                </div>
                                <div className="messageBox">
                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>2023.03.12 &nbsp;&nbsp;&nbsp; 14:01</div>
                                    <div><button style={{border: 'solid 0px', backgroundColor: '#fff', cursor: 'pointer'}}>X</button></div>
                                  </div>                              
                                  <div>이번 스케줄표에서 저랑 13일날 day랑 night 일정 변경 가능하실까요?</div>
                                  <div>발신자 : 참새</div>
                                </div>
                                <div className="messageBox">
                                  <div>2023.07.11 &nbsp;&nbsp;&nbsp;  17:30</div>
                                  <div>오늘 회식 오시나요?</div>
                                  <div>발신자 : 코뿔소</div>
                                </div>
                                <div className="messageBox">
                                  <div>2023.08.29 &nbsp;&nbsp;&nbsp;  08:00</div>
                                  <div>저 다이슨 공구하는데 싸게 같이사요~</div>
                                  <div>발신자 : 토끼</div>
                                </div>
                                <div className="messageBox">
                                  <div>2023.09.16  &nbsp;&nbsp;&nbsp; 11:59</div>
                                  <div>오늘 점심 뭐 드실 예정이세요?</div>
                                  <div>발신자 : 치타</div>
                                </div>
                              </div>
                            )}

                            {tab === 'sending' && (
                              <div style={{
                                marginTop:'10px',
                                height:'25px',
                                  }}>
                                {/* Content for sending tab */}
                                <div className="messageBox">
                                  <div>2023.01.17 &nbsp;&nbsp;&nbsp; 09:30</div>
                                  <div>수신자 : 간호 1팀 얼룩말</div>
                                  <div>오늘 나 병원가야해서 반차쓸거야</div>
                                </div>
                                <div className="messageBox">
                                  <div>2023.03.21 &nbsp;&nbsp;&nbsp; 10:25</div>
                                  <div>수신자 : 간호 3팀 거북이</div>
                                  <div>안녕하세요 지난번에 말씀드린 서류는 어떻게 진행되고 있을까요?</div>
                                </div>
                                <div className="messageBox">
                                  <div>2023.05.22 &nbsp;&nbsp;&nbsp; 17:22</div>
                                  <div>수신자 : 간호 5팀 사자</div>
                                  <div>너 오늘 night 아니지? 이따 곱창전골에 소주?</div>
                                </div>
                                <div className="messageBox">
                                  <div>2023.10.31 &nbsp;&nbsp;&nbsp; 18:09</div>
                                  <div>수신자 : 간호 1팀 개미핥기</div>
                                  <div>안녕하세요 스케줄 변경 건 때문에 연락드렸습니다~ 혹시 11일 night 가능하실까요...?</div>
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

                                        {/* 모달 화면 시작 */}
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

                                        {/* 모달 화면 끝 */}

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

                        {/* 사이드바 끝 */}


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
export default Message;