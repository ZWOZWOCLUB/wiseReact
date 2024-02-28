import "./core.css";
import "./01_profileInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callVacAPI, callVacHisAPI } from "../../apis/MyPageAPICalls.js";

function MPVacation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vac = useSelector((state) => state.mpVacReducer);
  const vacHis = useSelector((state) => state.mpVacHisReducer);
  const token = decodeJwt(window.localStorage.getItem("accessToken"));

  const vacDetail = vac.data;
  const vacHisList = vacHis.data;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric' });

  const [selectedOption, setSelectedOption] = useState(formattedDate);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {

    if (token !== null) {
      dispatch(
        callVacAPI({
          memCode: token.memCode
        })
      );
      dispatch(
        callVacHisAPI({
          memCode: token.memCode,
          year: selectedOption, // 이건 나중에 원하는 년도를 넘겨주면 그 해당 날짜 데이터를 받을 수 있음
        })
      );
    }
  }, []);

  useEffect(() => {

    dispatch(
      callVacHisAPI({
        memCode: token.memCode,
        year: selectedOption, 
      })
    );
   
  }, [selectedOption]);

  const [activeTab, setActiveTab] = useState("프로필 정보");

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "프로필 정보") {
      navigate("/main/mp", { replace: true });
    }
    if (tab === "인사 정보") {
      navigate("/main/mppersonnelInfo", { replace: true });
    }
    if (tab === "연차 관리") {
      navigate("/main/mpvacation", { replace: true });
    }
    if (tab === "출퇴근 정보") {
      navigate("/main/mpattendance", { replace: true });
    }
    if (tab === "서류함") {
      navigate("/main/mpdocument", { replace: true });
    }
  };

  return (
    <>
      <div className="layout-page">
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4">
              <span className="text-muted fw-light">계정 설정 /</span> 계정
            </h4>

            <div className="row">
              <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-3">
                  <li
                    className={`nav-item ${
                      activeTab === "프로필 정보" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("프로필 정보")}
                    >
                      <i className="bx bx-user me-1" style={{color: '#566a7f'}}></i> 프로필 정보
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "인사 정보" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("인사 정보")}
                    >
                      <i className="bx bx-bell me-1"></i> 인사 정보
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "연차 관리" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("연차 관리")}
                    >
                      <i className="bx bx-link-alt me-1"></i> 연차 관리
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "출퇴근 정보" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("출퇴근 정보")}
                    >
                      <i className="bx bx-link-alt me-1"></i> 출퇴근 정보
                    </span>
                  </li>
                  <li
                    className={`nav-item ${
                      activeTab === "서류함" ? "active" : ""
                    }`}
                  >
                    <span
                      className="nav-link"
                      onClick={() => handleTabClick("서류함")}
                    >
                      <i className="bx bx-link-alt me-1"></i> 서류함
                    </span>
                  </li>
                </ul>
             
                <div className="card mb-4">
                  <h5 className="card-header">연차 관리</h5>
                  <hr className="my-0" />

                  <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                      <div className="col-6 mb-4">
                        <div className="card h-100">
                          <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">
                              사용한 연차
                              <span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <small>*최근 3년까지 조회가 가능합니다.</small>
                              </span>
                            </h5>
                            <div className="dropdown">
                              <select
                                value={selectedOption}
                                onChange={handleChange}
                              >
                                <option value={formattedDate}>{formattedDate}</option>
                                <option value={formattedDate-1}>{formattedDate-1}</option>
                                <option value={formattedDate-2}>{formattedDate-2}</option>
                              </select>
                            </div>
                          </div>
                          <div
                            className="card-body"
                            style={{ overflowY: "auto" }}
                          >
                            <div className="table-responsive text-nowrap">
                              <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>시작일자</th>
                                    <th>종료일자</th>
                                  </tr>
                                </thead>
                                {vacHisList ? (
                                  <tbody className="table-border-bottom-0">
                                    {vacHisList &&
                                      vacHisList.map((vacHis) => (
                                        <tr>
                                          <td>{vacHis.vacStartDate}</td>
                                          <td>{vacHis.vacEndDate}</td>
                                        </tr>
                                      ))}
                                 
                                  </tbody>
                                ) : (
                                  "해당 연도 정보가 없습니다."
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      {vacDetail ? (
                        <div className="col-6 mb-4">
                          <div className="card" id="firstItem">
                            <div className="card-body">
                              <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                  <img
                                    src="../../assets/img/icons/unicons/cc-primary.png"
                                    alt="Credit Card"
                                    className="rounded"
                                  />
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
                                    {/* <i className="bx bx-dots-vertical-rounded"></i> */}
                                  </button>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="cardOpt1"
                                  >
                                    <span
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      View More
                                    </span>
                                    <span
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="fw-semibold d-block mb-1">
                                사용 가능 연차
                              </span>
                              <h3 className="card-title mb-2">
                                {vacDetail.vctCount}회
                              </h3>
                              <small className="text-success fw-semibold"></small>
                            </div>
                          </div>
                          <div className="card" id="secondItem">
                            <div className="card-body">
                              <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                  <img
                                    src="../../assets/img/icons/unicons/cc-primary.png"
                                    alt="Credit Card"
                                    className="rounded"
                                  />
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
                                    {/* <i className="bx bx-dots-vertical-rounded"></i> */}
                                  </button>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="cardOpt1"
                                  >
                                    <span
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      View More
                                    </span>
                                    <span
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="fw-semibold d-block mb-1">
                                소멸 예정 연차
                              </span>
                              <h3 className="card-title mb-2">
                                {vacDetail.vctDeadline}회
                              </h3>
                              {/* <small className="text-success fw-semibold">2025.01.01 소멸 예정</small> */}
                            </div>
                          </div>
                          <div className="card" id="thirdItem">
                            <div className="card-body">
                              <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                  <img
                                    src="../../assets/img/icons/unicons/cc-primary.png"
                                    alt="Credit Card"
                                    className="rounded"
                                  />
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
                                    {/* <i className="bx bx-dots-vertical-rounded"></i> */}
                                  </button>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="cardOpt1"
                                  >
                                    <span
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      View More
                                    </span>
                                    <span
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      Delete
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="fw-semibold d-block mb-1">
                                이번 년도 누적 사용 연차
                              </span>
                              <h3 className="card-title mb-2">
                                {vacDetail.vctAmountSpendVacation}회
                              </h3>
                              {/* <small className="text-success fw-semibold">이번년도 기준</small> */}
                            </div>
                          </div>
                        </div>
                      ) : (
                        "로딩중"
                      )}
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
  );
}
export default MPVacation;
