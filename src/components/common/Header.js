import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import newCoreCss from "../../@core/vendor/css/newCore.module.css";
import profile from "../../@core/img/avatars/1.png";
import { NavLink } from "react-router-dom";
import "../../pages/alarmAndMessage/message.css";
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import Modal from "./Modal";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { replace } from "stylis";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { callPerAlarmDetailAPI } from "../../apis/AAMAPICalls.js";
import { callSendMessageAPI } from "../../apis/AAMAPICalls.js";
import { callRecMessageAPI } from "../../apis/AAMAPICalls.js";

<script async defer src="https://buttons.github.io/buttons.js"></script>;
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("sended");
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const perAlarm = useSelector((state) => state.aamPerAlarmReducer);
  const sendMessage = useSelector((state) => state.aamSendMessageReducer);
  const recMessage = useSelector((state) => state.aamRecMessageReducer);

  const perAlarmList = perAlarm.data;
  const sendMessageList = sendMessage.data;
  const recMessageList = recMessage.data;


  // 메신저 API 요청
  const handleTabChange = (selectedTab) => {
    setTab(selectedTab);
    if (token !== null) {
      dispatch(
        callSendMessageAPI({
          memCode: token.memCode,
        })
      );
      dispatch(
        callRecMessageAPI({
          memCode: token.memCode,
        })
      );
    }
  };

  // 알림함 API 요청
  const handleTabChange1 = (selectedTab) => {
    setTab(selectedTab);
    if (token !== null) {
      dispatch(
        callPerAlarmDetailAPI({
          memCode: token.memCode,
        })
      );
    }
  };

  console.log('sendMessageList-->',sendMessageList);
  console.log('recMessageList-->',recMessageList);

  const onClickMyPage = () => {
    navigate("/mp", { replace: true });
  };
  

  useEffect(() => {
    console.log("useEffect의 token---->", token);
    // console.log("useEffect의 token.memCode--->", token.memCode);
  }, []);

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
      <nav
        className={`${coreCSS[`layout-navbar`]} ${coreCSS[`container-xxl`]} ${
          coreCSS[`navbar`]
        } ${coreCSS[`navbar-expand-xl`]} ${coreCSS[`navbar-detached`]} ${
          coreCSS[`align-items-center`]
        } ${themDefaultCSS[`bg-navbar-theme`]}`}
        id="layout-navbar"
      >
        <div
          className={`${coreCSS[`layout-menu-toggle`]} ${
            coreCSS[`navbar-nav`]
          } ${coreCSS[`align-items-xl-center`]} ${coreCSS[`me-3`]} ${
            coreCSS[`me-xl-0`]
          } ${coreCSS[`d-xl-none`]}`}
        >
          <a
            className={`${coreCSS[`nav-item`]} ${coreCSS[`nav-link`]} ${
              coreCSS[`px-0`]
            } ${coreCSS[`me-xl-4`]}`}
            href="javascript:void(0)"
          >
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          className={`${coreCSS[`navbar-nav-right`]} ${coreCSS[`d-flex`]} ${
            coreCSS[`align-items-center`]
          }`}
          id="navbar-collapse"
        >
          <div
            className={`${coreCSS[`navbar-nav`]} ${
              coreCSS[`align-items-center`]
            }`}
          >
            <div
              className={`${coreCSS[`nav-item`]} ${coreCSS[`d-flex`]} ${
                coreCSS[`align-items-center`]
              }`}
            >
              <i
                className="bx bx-search fs-4 lh-0"
                style={{ fontSize: 26 }}
              ></i>
              <input
                type="text"
                className={`${coreCSS[`form-control`]} ${coreCSS[`border-0`]} ${
                  coreCSS[`shadow-none`]
                }`}
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div>

          <ul
            className={`${coreCSS[`navbar-nav`]} ${coreCSS[`flex-row`]} ${
              coreCSS[`align-items-center`]
            } ${coreCSS[`ms-auto`]}`}
          >
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`me-3`]}`}
              style={{
                alignSelf: "center",
                height: 24,
                borderLeft: "1px solid #d3d3d3",
              }}
            />

            {/* 공지사항? */}
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${
                coreCSS[`me-3`]
              }`}
            >
              <i className="bx bxs-megaphone" style={{ fontSize: 27 }} />
            </li>

            {/* 쪽지함 */}
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${
                coreCSS[`me-3`]
              }`}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasEnd"
              onClick={() => handleTabChange("sended")}
            >
              <i className="bx bxs-megaphone" style={{ fontSize: 27 }} />
            </li>

            {/* 알림함 */}
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${
                coreCSS[`me-3`]
              }`}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasEnd1"
              onClick={() => handleTabChange1("sended")}
            >
              <i className="bx bxs-megaphone" style={{ fontSize: 27 }} />
            </li>

            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`me-3`]}`}
              style={{
                alignSelf: "center",
                height: 24,
                borderLeft: "1px solid #d3d3d3",
              }}
            />
            <li
              className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${
                coreCSS[`me-3`]
              }`}
              onClick={onClickMyPage}
            >
              <img
                src={profile}
                alt=""
                className={`${coreCSS[`w-px-30`]} ${coreCSS[`h-auto`]} ${
                  coreCSS[`rounded-circle`]
                }`}
              />
            </li>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]}`}>
              <i className="bx bx-log-out" style={{ fontSize: 28 }} />
            </li>
          </ul>
        </div>

        {/* 알림함 시작 */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasEnd1"
          aria-labelledby="offcanvasEndLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasEndLabel" className="offcanvas-title">
              알림함
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div
            className="offcanvas-body my-auto mx-0 flex-grow-0"
            style={{ overflowY: "auto", height: "95%" }}
          >
            {/* <div className="tabs">
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
          margin:'0px 0px 0px 50px',
        }}
      >
        전체 알람
      </span>
    </li>
    <li>
      <span
        onClick={() => handleTabChange('sending')}
        style={{
          cursor: 'pointer',
          color: tab === 'sending' ? 'blue' : 'black', // Example color change
          fontWeight: tab === 'sending' ? 'bold' : 'normal', // Example font weight change
          margin:'0px 0px 0px 65px',
        }}
      >
        개인 알람
      </span>
    </li>

    </div>
  </ul>
</div> */}

            {tab === "sended" && (
              <div>
                <div
                  className="offcanvas-body my-auto mx-0 flex-grow-0"
                  style={{
                    padding: "10px 10px 0px 10px",
                  }}
                >
                  {perAlarmList &&
                    perAlarmList.map((perAlarm) => (
                      <div
                        className="btn btn-outline-secondary d-grid w-100"
                        style={{
                          textAlign: "left",
                        }}
                      >
                        <div>{perAlarm.appDate}</div>
                        <div>
                          결재코드 {perAlarm.appCode} 번이 {perAlarm.appState}{" "}
                          되었습니다.{" "}
                        </div>
                      </div>
                    ))}

                  {/* <div  className="btn btn-outline-secondary d-grid w-100"
                                            style={{
                                            textAlign:'left',
                                            }}
                                            >
                                        <div>2024-01-01</div>
                                        <div>홍길동님의 연차 결재 서류에 참고인으로 설정되었습니다.</div>
                                      </div> */}
                </div>
              </div>
            )}

            
          </div>
        </div>
        {/* 알림함 끝 */}

        {/* 메신저 시작 */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasEnd"
          aria-labelledby="offcanvasEndLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasEndLabel" className="offcanvas-title">
              쪽지함
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div
            className="offcanvas-body my-auto mx-0 flex-grow-0"
            style={{ overflowY: "auto", height: "95%" }}
          >
            <div className="tabs">
              <ul>
                <div
                  style={{
                    marginBottom: "10px",
                    height: "25px",
                  }}
                >
                  <li>
                    <span
                      onClick={() => handleTabChange("sended")}
                      style={{
                        cursor: "pointer",
                        color: tab === "sended" ? "blue" : "black", // Example color change
                        fontWeight: tab === "sended" ? "bold" : "normal", // Example font weight change
                      }}
                    >
                      받은 내역
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleTabChange("sending")}
                      style={{
                        cursor: "pointer",
                        color: tab === "sending" ? "blue" : "black", // Example color change
                        fontWeight: tab === "sending" ? "bold" : "normal", // Example font weight change
                        margin: "0px 35px 0px 40px",
                      }}
                    >
                      보낸 내역
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleTabChange("newWrite")}
                      style={{
                        cursor: "pointer",
                        color: tab === "newWrite" ? "blue" : "black", // Example color change
                        fontWeight: tab === "newWrite" ? "bold" : "normal", // Example font weight change
                      }}
                    >
                      새 글 쓰기
                    </span>
                  </li>
                </div>
              </ul>
            </div>

            {tab === "sended" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "25px",
                }}
              >

                { recMessageList && recMessageList.map(
                  (recMessage) => (
                    <div
                  className="messageBox"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>{ recMessage.aamSendMessenger.msgDate }</div>
                    <div>
                      <button
                        style={{
                          border: "solid 0px",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <div>{ recMessage.aamSendMessenger.msgContents }</div>
                  <div>발신자 : { recMessage.aamSendMessenger.aamMember.memName }</div>
                </div>
                  )
                )}
                {/* <div
                  className="messageBox"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>2023.03.12 &nbsp;&nbsp;&nbsp; 14:01</div>
                    <div>
                      <button
                        style={{
                          border: "solid 0px",
                          backgroundColor: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  <div>결재 서류 확인 부탁드립니다.</div>
                  <div>발신자 : 기린</div>
                </div> */}
                


              </div>
            )}

            {tab === "sending" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "25px",
                }}
              >
                {/* Content for sending tab */}
                { sendMessageList && sendMessageList.map(
                  (sendMessage) => (
                  <div
                  className="messageBox"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <div>{ sendMessage.msgDate }</div>
                  <div>수신자 : { sendMessage.aamRecMessenger.aamMember.memName }</div>
                  <div>{ sendMessage.msgContents }</div>
                </div>
                  )
                )}
                {/* <div
                  className="messageBox"
                  style={{
                    textAlign: "left",
                  }}
                >
                  <div>2023.01.17 &nbsp;&nbsp;&nbsp; 09:30</div>
                  <div>수신자 : 간호 1팀 얼룩말</div>
                  <div>오늘 나 병원가야해서 반차쓸거야</div>
                </div> */}
              </div>
            )}
            {tab === "newWrite" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "25px",
                }}
              >
                <div>
                  <div>수신자</div>
                  <input
                    id="receiver"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCenter"
                  />
                  <div className="col-lg-4 col-md-6">
                    <div className="mt-3"></div>
                  </div>
                </div>
                <div>
                  <div>내용</div>
                  <input id="content" type="text" />
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{
                    marginTop: "10px",
                    height: "50px",
                    marginLeft: "250px",
                    backgroundColor: "#5f61e6",
                    color: "beige",
                    width: "100px",
                  }}
                >
                  보내기
                </button>
              </div>
            )}
          </div>
        </div>
        {/* 메신저 끝 */}
      </nav>

      {/* 모달 화면 시작 */}
      <div
        className="modal fade"
        id="modalCenter"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalCenterTitle">
                수신자 선택
              </h5>
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
                  <label htmlFor="nameWithTitle" className="form-label">
                    조직도가 보여질 화면
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
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button type="button" className="btn btn-primary">
                선택
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 화면 끝 */}
    </>
  );
}

export default Header;
