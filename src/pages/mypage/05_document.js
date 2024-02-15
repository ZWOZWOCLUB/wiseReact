
import './core.css'
import './01_profileInfo.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils.js';
import { callDocAPI } from '../../apis/MyPageAPICalls.js';

function MPDocument() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const doc = useSelector((state)=> state.mpDocReducer);
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const docList = doc.data;

  useEffect(
    () => {
      console.log('useEffect의 token---->',token);
      console.log('useEffect의 token.memCode--->', token.memCode);

      if(token !== null) {

        dispatch(callDocAPI({	
            memCode: token.memCode
        }));         
    }        
    }
  ,[]
);

console.log('doc--->',doc);
console.log('docList--->',docList);
  const [activeTab, setActiveTab] = useState('프로필 정보');

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === '프로필 정보') {
      navigate("/main/mp", { replace: true })
    }
    if (tab === '인사 정보') {
      navigate("/main/mppersonnelInfo", { replace: true })
    }
    if (tab === '연차 관리') {
      navigate("/main/mpvacation", { replace: true })
    }
    if (tab === '출퇴근 정보') {
      navigate("/main/mpattendance", { replace: true })
    }
    if (tab === '서류함') {
      navigate("/main/mpdocument", { replace: true })
    }
  };

  return (
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

                  <div id="iwantoverflow">
                    <div className="card-body" style={{ overflowY: 'auto', height: '700px' }}>


                      <div className="card">
                        <div className="table-responsive text-nowrap"></div>

                        <table className="table table-striped" id="table">

                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>증빙서류이름</th>
                              <th>제출일</th>
                              <th>다운로드</th>
                            </tr>
                          </thead>
                          { docList ? 
                          <tbody className="table-border-bottom-0">
                            
                            {docList.documentFileDTOList && docList.documentFileDTOList.map(
                              (documentFileDTOList) => (
                                <tr style={{ textAlign: "center" }} className="List">
                                  <td>
                                    <div>{documentFileDTOList.docAtcKind}</div>
                                  </td>
                                  <td>{documentFileDTOList.docAtcRegistDate}</td>
                                  <td>
                                    <i
                                      className="bx bx-down-arrow-alt"
                                      style={{ paddingRight: 10 }}
                                    />
                                  </td>
                                </tr>
                              )
                            )}
                            
                            {/* <tr style={{ textAlign: "center" }} className="List">


            <td>
              <div>전기기능사</div>
            </td>

            <td>0000-00-0000</td>
           
            <td>
              <i
                className="bx bx-down-arrow-alt"
                style={{ paddingRight: 10 }}
              />
            </td>
           
          </tr> */}
                          </tbody>
                          : '로딩중'}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>



              </div>

            </div>

          </div>



        </div>
      </div>



    </>
  )
}
export default MPDocument;