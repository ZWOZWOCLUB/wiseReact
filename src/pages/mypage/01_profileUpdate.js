import "./01_profileInfo.css";
import "./core.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callProfileAPI } from "../../apis/MyPageAPICalls.js";
import PersonnelInfo from "./02_personnelInfo.js";
// import {
//   callMemberDetailAPI
// } from '../../apis/MyPageAPICalls.js';
import { callMemberDetailAPI, callMemberUpdateAPI } from "../../apis/MyPageAPICalls.js";

function MyPageUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const member = useSelector((state) => state.mypageReducer);
  const profile = useSelector((state) => state.mpProReducer);
  const memberDetail = member.data;
  const profileDetail = profile.data;

  const [form, setForm] = useState({
    memCode: token.memCode,
      memEmail: memberDetail.memEmail,
      memPhone: memberDetail.memPhone,
      memAddress: memberDetail.memAddress,
  });
  

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 저장하기 클릭 시 실행되는 메소드
  const onClickUpdateMemberInfoHandler = () => {
    console.log("[memberUpdate] onClickUpdateMemberInfoHandler");

    const formData = new FormData();

    formData.append("memCode", form.memCode);
    formData.append("memEmail", form.memEmail);
    formData.append("memPhone", form.memPhone);
    formData.append("memAddress", form.memAddress);

   
    dispatch(
      callMemberUpdateAPI({
        form: formData,
      })
    );

    alert("마이페이지 정보 출력 화면으로 이동합니다.");
    navigate("/main/mp", { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    console.log("useEffect의 token---->", token);
    console.log("useEffect의 token.memCode--->", token.memCode);

    if (token !== null) {
      dispatch(
        callMemberDetailAPI({
          memCode: token.memCode,
        })
      );
      dispatch(
        callProfileAPI({
          memCode: token.memCode,
        })
      );
    }
  }, []);

  // useEffect(() => {

  //   console.log("setForm useEffect 실행--->",memberDetail);

  //   setForm({
  //     memCode: token.memCode,
  //     memEmail: memberDetail.memEmail,
  //     memPhone: memberDetail.memPhone,
  //     memAddress: memberDetail.memAddress,
  //   });
  // }, [memberDetail]);



  const onClickBack = () => {
    navigate("/main/mp", { replace: true });
  };

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
                  <h5 className="card-header">프로필 정보</h5>
                  <div className="card-body">
                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                    { profileDetail && (
                      <img
                        src={ profileDetail.docAtcPath }
                        alt="user-avatar"
                        className="d-block rounded"
                        height="100"
                        width="100"
                        id="uploadedAvatar"
                      />
                      ) }
                    </div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body">
                    {memberDetail && (
                  
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label htmlFor="firstName" className="form-label">
                              이름
                            </label>
                            <div>{memberDetail.memName}</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="lastName" className="form-label">
                              사번
                            </label>
                            <div>{memberDetail.memCode}</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="lastName" className="form-label">
                              생년월일
                            </label>
                            <div>{memberDetail.memBirth}</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="email" className="form-label">
                              이메일
                            </label>
                            <input
                              className="form-control"
                              name="memEmail"
                              type="text"
                              autofocus
                              value={form.memEmail}
                              onChange={ onChangeHandler }
                            />
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              부서
                            </label>
                            <div>{memberDetail.depName}</div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              htmlFor="organization"
                              className="form-label"
                            >
                              직위
                            </label>
                            <div>{memberDetail.posName}</div>
                          </div>

                          <div className="mb-3 col-md-6">
                            <label className="form-label" htmlFor="phoneNumber">
                              전화번호
                            </label>
                            <div className="input-group input-group-merge">
                              <input
                                className="form-control"
                                name="memPhone"
                                type="text"
                                autofocus
                                value={form.memPhone}
                                onChange={ onChangeHandler }
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label htmlFor="address" className="form-label">
                              주소
                            </label>
                            <input
                              className="form-control"
                              name="memAddress"
                              type="text"
                              autofocus
                              value={form.memAddress}
                              onChange={ onChangeHandler }
                            />
                          </div>

                          <div className="mb-3 col-md-6">
                            <div id="container">
                              <button
                                id="btn-modal1"
                                className="modalButton"
                                onClick={onClickBack}
                              >
                                이전으로
                              </button>
                            </div>
                          </div>

                          <div className="mb-3 col-md-6">
                            <div id="container">
                              <button
                                id="btn-modal2"
                                className="modalButton"
                                onClick={ onClickUpdateMemberInfoHandler }
                              >
                                저장
                              </button>
                            </div>
                          </div>
                        </div>
                    )}
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
export default MyPageUpdate;
