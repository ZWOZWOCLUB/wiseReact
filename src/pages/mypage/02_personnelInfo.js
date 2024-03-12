
import './core.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';
import { callDegreeDetailAPI } from '../../apis/MyPageAPICalls.js'
import { callCerDetailAPI } from '../../apis/MyPageAPICalls.js'
import { callCareerDetailAPI } from '../../apis/MyPageAPICalls.js'

function PersonnelInfo(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const degree = useSelector(state => state.mpDegreeReducer);
    const career = useSelector(state => state.mpCareerReducer);
    const cer = useSelector(state => state.mpCerReducer);

    const degreeList = degree.data;
    const careerList = career.data;
    const cerList = cer.data;


    useEffect(
      () => {
        console.log('useEffect의 token---->',token);

        if(token !== null) {

          dispatch(callDegreeDetailAPI({	
              memCode: token.memCode
          })); 
          dispatch(callCerDetailAPI({	
              memCode: token.memCode
          })); 
          dispatch(callCareerDetailAPI({	
              memCode: token.memCode
          }));            
      }        
      }
    ,[]
  );

    const [activeTab, setActiveTab] = useState('프로필 정보');

    const handleTabClick = (tab) => {
      setActiveTab(tab);

      if (tab === '프로필 정보'){
        navigate("/main/mp", { replace: true })
      }
      if (tab === '인사 정보'){
        navigate("/main/mppersonnelInfo", { replace: true })
      }
      if (tab === '연차 관리'){
        navigate("/main/mpvacation", { replace: true })
      }
      if (tab === '출퇴근 정보'){
        navigate("/main/mpattendance", { replace: true })
      }
      if (tab === '서류함'){
        navigate("/main/mpdocument", { replace: true })
      }
    };

    return(
        <>


        <div className="layout-page">

          <div className="content-wrapper">

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">계정 설정 /</span> 계정</h4>

              <div className="row">
                <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-3">
      <li className={`nav-item ${activeTab === '프로필 정보' ? 'active' : ''}`}>
        <span className="nav-link" onClick={() => handleTabClick('프로필 정보')}>
          <i className="bx bx-user me-1" style={{color: '#566a7f'}}></i> 프로필 정보
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
                                { cerList && cerList.map(
                                  (cer) => (
                                    <tr>
                                      <td><i className="fab fa-angular fa-lg text-danger me-3"></i><strong>{ cer.cerName }</strong></td>
                                      <td>{ cer.cerDay }</td>
                                      <td>{ cer.cerKind }</td>
                                      <td>{ cer.cerInstitution }</td>
                                    </tr>
                                  )
                                )}
                             
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
                                  <th>직위(직책)</th>
                                </tr>
                              </thead>
                              <tbody class="table-border-bottom-0">
                                { careerList && careerList.map(
                                  (career) => (
                                    <tr>
                                      <td><i className="fab fa-angular fa-lg text-danger me-3"></i>
                                      <strong>{ career.crrName }</strong></td>
                                      <td>{ career.crrStartDate }</td>
                                      <td>{ career.crrEndDate }</td>
                                      <td>{ career.crrPosition }</td>
                                    </tr>
                                  )
                                ) }
                              
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
                                { degreeList && degreeList.map(
                                  (degree) => (
                                    <tr>
                                      <td><i class="fab fa-angular fa-lg text-danger me-3"></i> 
                                      <strong>{ degree.degName }</strong></td>
                                      <td>{ degree.degAdmissions }</td>
                                      <td>{ degree.degGraduation }</td>
                                      <td>{ degree.degMajor }</td>
                                      <td>{ degree.degState }</td>
                                    </tr>
                                  )
                                )}
                          
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


    
        </>
    )
}
export default PersonnelInfo;