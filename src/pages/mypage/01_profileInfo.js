
import './01_profileInfo.css';
import './core.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';
import PersonnelInfo from './02_personnelInfo.js';
// import {
//   callMemberDetailAPI
// } from '../../apis/MyPageAPICalls.js';

function MyPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const member = useSelector(state => state.memberReducer);

    const dessertList = useSelector(state => state.productReducer); 

    // useEffect(
    //     () => {
    //         dispatch(callMemberDetailAPI({
    //           // memCode: params.memCode
    //           memCode: 3
    //         }));            
    //     }
    //     ,[]
    // );

    const onClickUpdate = () => {
      navigate("/mpUpdate",{replace:true})
    }
    const onClickMyPage = () => {
      navigate("/mp",{replace: true})
  }

    function openSignatureCanvasPopup() {
      window.open('/sign', 'SignatureCanvas', 'width=500,height=500,left=200,top=200');
    }

    const [activeTab, setActiveTab] = useState('프로필 정보');

    const handleTabClick = (tab) => {
      setActiveTab(tab);

      if (tab === '프로필 정보'){
        navigate("/mp", { replace: true })
      }
      if (tab === '인사 정보'){
        navigate("/mppersonnelInfo", { replace: true })
      }
      if (tab === '연차 관리'){
        navigate("/mpvacation", { replace: true })
      }
      if (tab === '출퇴근 정보'){
        navigate("/mpattendance", { replace: true })
      }
      if (tab === '서류함'){
        navigate("/mpdocument", { replace: true })
      }
    };

    return (
        <>
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">

        <div className="layout-page">

          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">계정 설정 /</span> 계정</h4>

              <div className="row">
                <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-3">
      <li className={`nav-item ${activeTab === '프로필 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('프로필 정보')}>
          <i className="bx bx-user me-1"></i> 프로필 정보
        </span>
      </li>
      <li className={`nav-item ${activeTab === '인사 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('인사 정보')}>
          <i className="bx bx-bell me-1"></i> 인사 정보
        </span>
      </li>
      <li className={`nav-item ${activeTab === '연차 관리' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('연차 관리')}>
          <i className="bx bx-link-alt me-1"></i> 연차 관리
        </span>
      </li>
      <li className={`nav-item ${activeTab === '출퇴근 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('출퇴근 정보')}>
          <i className="bx bx-link-alt me-1"></i> 출퇴근 정보
        </span>
      </li>
      <li className={`nav-item ${activeTab === '서류함' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('서류함')}>
          <i className="bx bx-link-alt me-1"></i> 서류함
        </span>
      </li>
    </ul>
                  <div className="card mb-4">
                    <h5 className="card-header">프로필 정보</h5>
                    <div className="card-body">
                      <div className="d-flex align-items-start align-items-sm-center gap-4">
                        <img
                          src="../../assets/img/avatars/1.png"
                          alt="user-avatar"
                          className="d-block rounded"
                          height="100"
                          width="100"
                          id="uploadedAvatar"
                        />
                        
                      </div>
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                      <form id="formAccountSettings" method="POST" onSubmit="return false">
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="firstName" className="form-label">이름</label>
                            <div>
                              샘 해밍턴
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="lastName" className="form-label">사번</label>
                            <div>user01</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="lastName" className="form-label">생년월일</label>
                            <div>1989.03.05</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="email" className="form-label">이메일</label>
                            <div>sam@gmail.com</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="organization" className="form-label">부서</label>
                            <div>
                              간호 1팀
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="organization" className="form-label">직위</label>
                            <div>중간 관리자</div>
                          </div>
                          
                          <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="phoneNumber">전화번호</label>
                            <div className="input-group input-group-merge">
                              <div>010-0101-0101</div>
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="address" className="form-label">주소</label>
                            <div>30330 인사동길 12 대일빌딩 7층</div>
                          </div>



                          <div className="mb-3 col-md-6">
                            <div id="container">
                              <button id="btn-modal1" className="modalButton">비밀번호 변경</button>
                            </div>
                          </div>



                          <div className="mb-3 col-md-6">
                            <div id="container">
                              <button id="btn-modal2" className="modalButton" onClick={onClickUpdate}
                              
                              >개인정보 수정</button>
                            </div>
                          </div>



                          <div className="mb-3 col-md-6">
                            <div id="container">
                              <button id="btn-modal3" className="modalButton"
                              
                              onClick={openSignatureCanvasPopup}
                              >서명 등록/수정</button>
                            </div>
                          </div>
                        

                        </div>
                      </form>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div id="modal1" className="modal-overlay overlay-css" tabIndex="-1" aria-hidden="true">
                <div className="modal-window window-css" role="document">
        
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCenterTitle" style={{fontSize: '1.125rem'}}>비밀번호 변경</h5>
                            <div className="close-area1 close-css">X</div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="nameWithTitle" className="form-label">현재 비밀번호</label>
                                    <input type="text" id="nameWithTitle" className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="nameWithTitle" className="form-label">변경할 비밀번호</label>
                                    <input type="text" id="nameWithTitle" className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="nameWithTitle" className="form-label">변경할 비밀번호 재입력</label>
                                    <input type="text" id="nameWithTitle" className="form-control" />
                                </div>
                            </div>
        
                        </div>
                        <div className="modal-footer">
        
                            <button type="button" className="btn btn-primary">저장</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modal2" className="modal-overlay overlay-css" tabindex="-1" aria-hidden="true">
              <div className="modal-window window-css" role="document">
      
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="modalCenterTitle" style={{fontSize: '1.125rem'}}>비밀번호 변경</h5>
                          <div className="close-area2 close-css">X</div>
                      </div>
                      <div className="modal-body">
                          <div className="row">
                              <div className="col mb-3">
                                  <label htmlFor="nameWithTitle" className="form-label">현재 비밀번호222</label>
                                  <input type="text" id="nameWithTitle" className="form-control" />
                              </div>
                          </div>
                          <div className="row">
                              <div className="col mb-3">
                                  <label htmlFor="nameWithTitle" className="form-label">변경할 비밀번호</label>
                                  <input type="text" id="nameWithTitle" className="form-control" />
                              </div>
                          </div>
                          <div className="row">
                              <div className="col mb-3">
                                  <label htmlFor="nameWithTitle" className="form-label">변경할 비밀번호 재입력</label>
                                  <input type="text" id="nameWithTitle" className="form-control" />
                              </div>
                          </div>
      
                      </div>
                      <div className="modal-footer">
      
                          <button type="button" className="btn btn-primary">저장</button>
                      </div>
                  </div>
              </div>
          </div>

          <div id="modal3" className="modal-overlay overlay-css" tabindex="-1" aria-hidden="true">
            <div className="modal-window window-css" role="document" >
    
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalCenterTitle" style={{fontSize: '1.125rem'}}>비밀번호 변경</h5>
                        <div className="close-area3 close-css">X</div>
                    </div>
                    <div className="modal-body">
                      <div style={{width: '300px', height: '300px'}}> 
                        <canvas id="canvas" style={{border: '1px solid black'}}></canvas> 
                      </div>
                      <div> 
                       <button id="save">save</button>
                      </div>
    
                    </div>
                    <div className="modal-footer">
    
                        <button type="button" className="btn btn-primary">저장</button>
                    </div>
                </div>
            </div>
        </div>

        
            </div>



            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>

      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
        </>
    )

}
export default MyPage;