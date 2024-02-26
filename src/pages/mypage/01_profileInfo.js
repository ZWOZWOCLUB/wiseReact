import "./01_profileInfo.css";
import "./core.css";
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callMemberDetailAPI } from "../../apis/MyPageAPICalls.js";
import { callPassUpdateAPI } from "../../apis/MyPageAPICalls.js";
import { callProfileAPI } from "../../apis/MyPageAPICalls.js";
import { callMainSignAPI } from "../../apis/MyPageAPICalls.js";

function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const member = useSelector((state) => state.mypageReducer);
  const pass = useSelector((state) => state.mpUpdateReducer);
  const profile = useSelector((state) => state.mpProReducer);
  const sign = useSelector((state) => state.mpSignReducer);
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const memberDetail = member.data;
  const profileDetail = profile.data;
  const signDetail = sign.data;
  
  const [form, setForm] = useState({
    memCode: token.memCode,
    originMemPassword: '',
    newMemPassword1: '',
    newMemPassword2: '',
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
    formData.append("originMemPassword", form.originMemPassword);
    formData.append("newMemPassword1", form.newMemPassword1);
    formData.append("newMemPassword2", form.newMemPassword2);

   
    dispatch(
      callPassUpdateAPI({
        form: formData,
      })
    );
   
  };


  useEffect(() => {
    
    if(pass.status === 400){
      console.log('변경할 비밀번호가 일치하지 않습니다.');
      alert('변경할 비밀번호가 일치하지 않습니다.');
    }
    if(pass.status === 403){
      console.log('기존 비밀번호가 일치하지 않습니다.');
      alert('기존 비밀번호가 일치하지 않습니다.');
    }
    if(pass.status === 200){
      alert("변경이 성공적으로 완료되었습니다.");
      navigate("/main/mp", { replace: true });
     window.location.reload();
    }
    
  }, [pass]);


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
      dispatch(
        callMainSignAPI({
          memCode: token.memCode,
        })
      );
    }
    
  }, []);

  const onClickUpdate = () => {
    navigate("/main/mpUpdate", { replace: true });
  };

  function openSignatureCanvasPopup() {
    navigate("/main/sign", { replace: true });
  }

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
      {/* 파비콘 */}
      <link
        rel="icon"
        type="image/x-icon"
        href="../../assets/img/favicon/favicon.ico"
      />

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
      <link
        rel="stylesheet"
        href="../../assets/vendor/css/core.css"
        className="template-customizer-core-css"
      />
      <link
        rel="stylesheet"
        href="../../assets/vendor/css/theme-default.css"
        className="template-customizer-theme-css"
      />
      <link rel="stylesheet" href="../../assets/css/demo.css" />

      {/* Vendors CSS */}
      <link
        rel="stylesheet"
        href="../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
      />

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
                          <div>{memberDetail.memEmail}</div>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            부서
                          </label>
                          <div>{memberDetail.depName}</div>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="organization" className="form-label">
                            직위
                          </label>
                          <div>{memberDetail.posName}</div>
                        </div>

                        <div className="mb-3 col-md-6">
                          <label className="form-label" htmlFor="phoneNumber">
                            전화번호
                          </label>
                          <div className="input-group input-group-merge">
                            <div>{memberDetail.memPhone}</div>
                          </div>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="address" className="form-label">
                            주소
                          </label>
                          <div>{memberDetail.memAddress}</div>
                        </div>

                        <div className="mb-3 col-md-6">
                          <div id="container">
                            <button
                              id="btn-modal1"
                              className="modalButton"
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#modalCenter1"
                            >
                              비밀번호 변경
                            </button>
                          </div>
                        </div>

                        <div className="mb-3 col-md-6">
                          <div id="container">
                            <button
                              id="btn-modal2"
                              className="modalButton"
                              onClick={onClickUpdate}
                            >
                              개인정보 수정
                            </button>
                          </div>
                        </div>

                        <div className="mb-3 col-md-6">
                          <div id="container">
                            { signDetail ? (
                          <img
                        src={ signDetail.docAtcPath }
                        alt="user-avatar"
                        className="d-block rounded"
                        height="100"
                        width="100"
                        id="uploadedAvatar"
                      />
                      ) : '로딩중'}
                            <button
                              id="btn-modal3"
                              className="modalButton"
                              onClick={openSignatureCanvasPopup}
                            >
                              서명 등록/수정
                            </button>
                          </div>
                          <small>*등록한 서명이 표시될 때까지 시간이 소요될 수 있습니다.</small>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 비밀번호 변경 모달 */}
            <div
              className="modal fade"
              id="modalCenter1"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="modalCenterTitle">
                      비밀번호 변경
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      style={{
                        marginTop: "20px",
                        marginRight: "20px",
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col mb-3">
                        <label for="nameWithTitle" className="form-label">
                          기존 비밀번호
                        </label>
                        <input
                          type="text"
                          id="nameWithTitle"
                          className="form-control"
                          name="originMemPassword"
                          onChange={ onChangeHandler }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-3">
                        <label for="nameWithTitle" className="form-label">
                          변경할 비밀번호
                        </label>
                        <input
                          type="text"
                          id="nameWithTitle"
                          className="form-control"
                          name="newMemPassword1"
                          onChange={ onChangeHandler }
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-3">
                        <label for="nameWithTitle" className="form-label">
                          변경할 비밀번호 재입력
                        </label>
                        <input
                          type="text"
                          id="nameWithTitle"
                          className="form-control"
                          name="newMemPassword2"
                          onChange={ onChangeHandler }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-dismiss="modal"
                    >
                      닫기
                    </button>
                    <button type="button" className="btn btn-primary"
                    onClick={ onClickUpdateMemberInfoHandler }
                    >
                      변경하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 비밀번호 변경 모달 끝 */}

            <div
              id="modal2"
              className="modal-overlay overlay-css"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-window window-css" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="modalCenterTitle"
                      style={{ fontSize: "1.125rem" }}
                    >
                      비밀번호 변경
                    </h5>
                    <div className="close-area2 close-css"
                    
                    >X</div>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col mb-3">
                        <label htmlFor="nameWithTitle" className="form-label">
                          현재 비밀번호222
                        </label>
                        <input
                          type="text"
                          id="nameWithTitle"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-3">
                        <label htmlFor="nameWithTitle" className="form-label">
                          변경할 비밀번호
                        </label>
                        <input
                          type="text"
                          id="nameWithTitle"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-3">
                        <label htmlFor="nameWithTitle" className="form-label">
                          변경할 비밀번호 재입력
                        </label>
                        <input
                          type="text"
                          id="nameWithTitle"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                      저장
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="modal3"
              className="modal-overlay overlay-css"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-window window-css" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="modalCenterTitle"
                      style={{ fontSize: "1.125rem" }}
                    >
                      비밀번호 변경
                    </h5>
                    <div className="close-area3 close-css">X</div>
                  </div>
                  <div className="modal-body">
                    <div style={{ width: "300px", height: "300px" }}>
                      <canvas
                        id="canvas"
                        style={{ border: "1px solid black" }}
                      ></canvas>
                    </div>
                    <div>
                      <button id="save">save</button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                      저장
                    </button>
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
export default MyPage;
