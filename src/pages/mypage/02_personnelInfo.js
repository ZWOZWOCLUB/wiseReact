
import './core.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';

function PersonnelInfo(){

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
                  <div className="card mb-4">
                    <h5 className="card-header">인사 정보</h5>

                    
                    <hr className="my-0" />
                    <div id="iwantoverflow">
                      <div className="card-body" style={{overflowY: 'auto', height: '700px'}}>
                    

                        <div className="card">
                          <h5 className="card-header">자격</h5>
                          <div className="table-responsive text-nowrap">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>취득자격</th>
                                  <th>취득일자</th>
                                  <th>자격번호</th>
                                  <th>발행기관</th>
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>컴퓨터 활용능력 1급</strong></td>
                                  <td>2023-03-01</td>
                                  <td>100-044-0033</td>
                                  <td>대한상공회의소</td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>전기기능사</strong></td>
                                  <td>2023-05-03</td>
                                  <td>1002-0956-2345</td>
                                  <td>한국산업인력공단</td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i>
                                      <strong>한국사능력검정시험 2급</strong></td>
                                  <td>2023-06-31</td>
                                  <td>5673-1246-345</td>
                                  <td>국사편찬위원회</td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>정보처리기능사</strong></td>
                                  <td>2023-08-17</td>
                                  <td>2022-032-0333</td>
                                  <td>한국산업인력공단</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      
                        <hr className="my-5" />
                      
                        <div className="card">
                          <h5 className="card-header">경력</h5>
                          <div className="table-responsive text-nowrap">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>회사명</th>
                                  <th>입사일</th>
                                  <th>퇴직일</th>
                                  <th>직무</th>
                                  <th>직위(직책)</th>
                                </tr>
                              </thead>
                              <tbody class="table-border-bottom-0">
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i>
                                      <strong>(주)오리엔텔코리아</strong></td>
                                  <td>2020-03-04</td>
                                  <td>
                                    2020-09-21
                                  </td>
                                  <td>사무업무</td>
                                  <td>
                                    사원
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i>
                                      <strong>(주)씨아이에스엠텍</strong></td>
                                  <td>2020-10-01</td>
                                  <td>
                                    2021-10-05
                                  </td>
                                  <td>소프트웨어 개발</td>
                                  <td>
                                    팀원
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i>
                                      <strong>(주)경수제철건설</strong></td>
                                  <td>2021-11-14</td>
                                  <td>
                                    2022-02-13
                                  </td>
                                  <td>건축/철강구조물</td>
                                  <td>
                                    사원
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i>
                                      <strong>(주)우아한형제들</strong></td>
                                  <td>2022-03-04</td>
                                  <td>
                                    2023-10-06
                                  </td>
                                  <td>사무업무</td>
                                  <td>
                                    사원
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      
                        <hr className="my-5" />
                      
                        <div className="card">
                          <h5 className="card-header">학위</h5>
                          <div className="table-responsive text-nowrap">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>학교(교육)명</th>
                                  <th>입학일</th>
                                  <th>졸업(예정)일</th>
                                  <th>학과/전공</th>
                                  <th>상태</th>
                                </tr>
                              </thead>
                              <tbody className="table-border-bottom-0">
                                <tr>
                                  <td><i class="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>자운고등학교</strong></td>
                                  <td>2019-03-04</td>
                                  <td>2022-02-01</td>
                                  <td></td>
                                  <td>
                                    졸업
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>바리스타 2급 과정</strong></td>
                                  <td>2019-03-04</td>
                                  <td>2022-02-01</td>
                                  <td></td>
                                  <td>
                                    수료
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>방송통신대학교</strong></td>
                                  <td>2019-03-04</td>
                                  <td>2022-02-01</td>
                                  <td>전기</td>
                                  <td>
                                    재학
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>숭실대학교</strong></td>
                                  <td>2019-03-04</td>
                                  <td>2022-02-01</td>
                                  <td>생물</td>
                                  <td>
                                    휴학
                                  </td>
                                </tr>
                                <tr>
                                  <td><i className="fab fa-angular fa-lg text-danger me-3"></i> 
                                    <strong>인제대학교</strong></td>
                                  <td>2019-03-04</td>
                                  <td>2022-02-01</td>
                                  <td>철학</td>
                                  <td>
                                    중퇴
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
export default PersonnelInfo;