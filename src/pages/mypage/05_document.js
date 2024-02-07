
import './core.css'
import './01_profileInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';

function MPDocument(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const member = useSelector(state => state.memberReducer);

    

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

    return(
        <>

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
                    <h5 className="card-header">서류함</h5>
                    <hr className="my-0" />

                      <div className="docContainer">

                        <div className="card" 
                        style={{height: '150px',
                        marginLeft: '20px', 
                        marginRight: '20px',
                         marginBottom: '15px', 
                         marginTop: '5px' ,
                         width: '45%'}} >
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <i className="bx bx-link-alt me-1"></i>
                              </div>
                              <button className="dropdown">
                               
                                <i className='bx bxs-download' style={{cursor: 'pointer'}}></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                  <span className="dropdown-item" href="javascript:void(0);">다운로드</span>
                                  <span className="dropdown-item" href="javascript:void(0);">미리보기</span>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">제출일자 : 2023-01-01</span>
                            <h4 className="card-title mb-2">졸업 증명서</h4>
                          </div>
                        </div>
                        <div className="card" 
                        style={{height: '150px',
                        marginLeft: '20px', 
                        marginRight: '20px',
                         marginBottom: '15px', 
                         marginTop: '5px' ,
                         width: '45%'}} >
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <i className="bx bx-link-alt me-1"></i>
                              </div>
                              <button className="dropdown">
                                <i className='bx bxs-download'  style={{cursor: 'pointer'}}></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                <span className="dropdown-item" href="javascript:void(0);">다운로드</span>
                                  <span className="dropdown-item" href="javascript:void(0);">미리보기</span>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">제출일자 : 2023-01-01</span>
                            <h4 className="card-title mb-2">개인정보활용동의서</h4>
                          </div>
                        </div>
                        <div className="card" 
                        style={{height: '150px',
                        marginLeft: '20px', 
                        marginRight: '20px',
                         marginBottom: '15px', 
                         marginTop: '5px' ,
                         width: '45%'}} >
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <i className="bx bx-link-alt me-1"></i>
                              </div>
                              <button className="dropdown">
                                <i className='bx bxs-download'  style={{cursor: 'pointer'}}></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                <span className="dropdown-item" href="javascript:void(0);">다운로드</span>
                                  <span className="dropdown-item" href="javascript:void(0);">미리보기</span>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">(주)한컴타자</span>
                            <h4 className="card-title mb-2">재직증명서</h4>
                          </div>
                        </div>
                        <div className="card" 
                        style={{height: '150px',
                        marginLeft: '20px', 
                        marginRight: '20px',
                         marginBottom: '15px', 
                         marginTop: '5px' ,
                         width: '45%'}} >
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <i className="bx bx-link-alt me-1"></i>
                              </div>
                              <button className="dropdown">
                                <i className='bx bxs-download'  style={{cursor: 'pointer'}}></i>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                <span className="dropdown-item" href="javascript:void(0);">다운로드</span>
                                  <span className="dropdown-item" href="javascript:void(0);">미리보기</span>
                                </div>
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">우리은행</span>
                            <h4 className="card-title mb-2">통장 사본</h4>
                          </div>
                        </div>
                        
                        

                      </div>
                  </div>
                  
                </div>

        </>
    )
}
export default MPDocument;