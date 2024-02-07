
import './core.css'
import './01_profileInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';

function MPVacation(){
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
                  {/* <ul class="nav nav-pills flex-column flex-md-row mb-3">
                    <li class="nav-item">
                      <a class="nav-link" href="zwo01_profileInfo.html"
                      ><i class="bx bx-user me-1"></i> 프로필 정보</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="zwo02_personnelInfo.html"
                        ><i class="bx bx-bell me-1"></i> 인사 정보</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" href="javascript:void(0);"
                        ><i class="bx bx-link-alt me-1"></i> 연차 관리</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="zwo04_attendance.html"
                        ><i class="bx bx-link-alt me-1"></i> 출퇴근 정보</a
                      >
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="zwo05_document.html"
                        ><i class="bx bx-link-alt me-1"></i> 서류함</a
                      >
                    </li>
                  </ul> */}
                  <div className="card mb-4">
                    <h5 className="card-header">연차 관리</h5>
                    <hr className="my-0" />

                  

            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-6 mb-4">
                  <div className="card h-100">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="card-title m-0 me-2">올해 사용한 연차
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <small>
                          
                        </small></span></h5>
                      <div className="dropdown">
                        <button
                          className="btn p-0"
                          type="button"
                          id="transactionID"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                          <span className="dropdown-item" href="javascript:void(0);">Last 28 Days</span>
                          <span className="dropdown-item" href="javascript:void(0);">Last Month</span>
                          <span className="dropdown-item" href="javascript:void(0);">Last Year</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-body" style={{overflowY: 'auto'}} >
                <div className="table-responsive text-nowrap" >
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>사용일자</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                      <tr>
                        <td>2020-03-04</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                    </div>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="card" id="firstItem">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="cardOpt1">
                            <span className="dropdown-item" href="javascript:void(0);">View More</span>
                            <span className="dropdown-item" href="javascript:void(0);">Delete</span>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">사용 가능 연차</span>
                      <h3 className="card-title mb-2">10회</h3>
                      <small className="text-success fw-semibold"></small>
                    </div>
                  </div>
                  <div className="card" id="secondItem">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="cardOpt1">
                            <span className="dropdown-item" href="javascript:void(0);">View More</span>
                            <span className="dropdown-item" href="javascript:void(0);">Delete</span>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">소멸 예정 연차</span>
                      <h3 className="card-title mb-2">3회</h3>
                      <small className="text-success fw-semibold">2025.01.01 소멸 예정</small>
                    </div>
                  </div>
                  <div className="card" id="thirdItem">
                    <div className="card-body">
                      <div className="card-title d-flex align-items-start justify-content-between">
                        <div className="avatar flex-shrink-0">
                          <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn p-0"
                            type="button"
                            id="cardOpt1"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="cardOpt1">
                            <span className="dropdown-item" href="javascript:void(0);">View More</span>
                            <span className="dropdown-item" href="javascript:void(0);">Delete</span>
                          </div>
                        </div>
                      </div>
                      <span className="fw-semibold d-block mb-1">누적 사용 연차</span>
                      <h3 className="card-title mb-2">5회</h3>
                      <small className="text-success fw-semibold">이번년도 기준</small>
                    </div>
                  </div>
                </div>
                
                    
                    
                  
              </div>
                
              
              
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
export default MPVacation;