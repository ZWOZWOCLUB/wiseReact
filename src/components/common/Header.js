import coreCSS from "../../@core/vendor/css/core.module.css";
import themDefaultCSS from "../../@core/vendor/css/themeDefault.module.css";
import "../../pages/alarmAndMessage/message.css";
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { callPerAlarmDetailAPI } from "../../apis/AAMAPICalls.js";
import { callSendMessageAPI } from "../../apis/AAMAPICalls.js";
import { callRecMessageAPI } from "../../apis/AAMAPICalls.js";
import { callMsgCheckStatusChangeAPI } from "../../apis/AAMAPICalls.js";
import { callRecDeleteStatusUpdateAPI } from "../../apis/AAMAPICalls.js";
import { callSendDeleteStatusUpdateAPI } from "../../apis/AAMAPICalls.js";
import { callAlarmCheckStatusChangeAPI } from "../../apis/AAMAPICalls.js";
import { callAllAlarmDetailAPI } from "../../apis/AAMAPICalls.js";
import { callNoticeCheckStatusChangeAPI } from "../../apis/AAMAPICalls.js";
import { callSendNewMsgAPI } from "../../apis/AAMAPICalls.js";
import "tui-tree/dist/tui-tree.css";
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { callMemberDetailAPI } from "../../apis/MyPageAPICalls.js";
import { callLogoutAPI } from "../../apis/MemberAPICalls.js";
import "../../pages/alarmAndMessage/message.css";
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import { callFirstRecMessageAPI } from "../../apis/AAMAPICalls.js";
import { callFirstPerAlarmDetailAPI } from "../../apis/AAMAPICalls.js";
import { callFirstAllAlarmDetailAPI } from "../../apis/AAMAPICalls.js";
import { callReferencerAPI } from "../../apis/AAMAPICalls.js";
import { callApprovalAPI } from "../../apis/AAMAPICalls.js";
import "tui-tree/dist/tui-tree.css";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

<script async defer src="https://buttons.github.io/buttons.js"></script>;
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState("sended");
  const [check, setCheck] = useState(true);
  const [alarm, setAlarm] = useState(true);
  const [notice, setNotice] = useState(true);
  // const color = check ? 'blue' : 'red';

  const perAlarm = useSelector((state) => state.aamPerAlarmReducer);
  const allAlarm = useSelector((state) => state.aamAllAlarmReducer);
  const sendMessage = useSelector((state) => state.aamSendMessageReducer);
  const recMessage = useSelector((state) => state.aamRecMessageReducer);
  const deleteStatus = useSelector((state) => state.aamPutReducer);
  const departmentList = useSelector((state) => state.organizationChartReducer);
  const alarmReducer = useSelector((state) => state.aamPutAlarmReducer);
  const sendNewMsgReducer = useSelector((state) => state.aamSendNewMsgReducer);
  const referencer = useSelector((state) => state.aamReferenceReducer);
  const approval = useSelector((state) => state.aamApprovalReducer);

  const perAlarmList = perAlarm.data;
  const sendMessageList = sendMessage.data;
  const recMessageList = recMessage.data;
  const allAlarmList = allAlarm.data;
  const sendNewMsgReducerDetail = sendNewMsgReducer.data;

  const firstRec = useSelector((state) => state.aamFirstRecReducer);
  const firstNotice = useSelector((state) => state.aamFirstNoticeReducer);
  const firstAlarm = useSelector((state) => state.aamFirstSendReducer);

  const [checked, setChecked] = useState([]);
  const [names, setNames] = useState("");
  const [codes, setCodes] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(["동물원병원"]);
  const [inputValue, setInputValue] = useState("");
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const [form, setForm] = useState({
    msgContents: "",
    memCode: token?.memCode,
    msgDate: new Date(),
    msgDeleteStatus: "N",
  });

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 200) {
      setInputValue(value);
    } else {
      alert("최대 200자까지만 입력이 가능합니다.");
    }
  };

  const onClickGetMemCode = (e) => {
    // (checked) => setChecked(checked)
    console.log(e.value);
    // setChecked(e.value);
  };

  const nodes =
    departmentList && departmentList.children
      ? [
          {
            value: departmentList.depName,
            label: departmentList.depName,
            expandDisabled: true,
            children: departmentList.children.map((dep) => ({
              value: dep.depName === "인사팀" ? dep.depName : dep.depName,
              label: dep.depName === "인사팀" ? dep.depName : dep.depName,
              children:
                dep.depName === "인사팀"
                  ? dep.memberList.map((mem) => ({
                      value: mem.memCode + " " + mem.memName,
                      label: mem.memName + " " + mem.posName,
                    }))
                  : dep.children.map((chi) => ({
                      value: chi.depCode,
                      label: chi.depName,
                      children: chi.memberList.map((mem) => ({
                        value: mem.memCode + " " + mem.memName,
                        label: mem.memName + " " + mem.posName,
                      })),
                    })),
            })),
          },
        ]
      : [];

  const searchMethod = (node, searchQuery) =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase());

  const onClickSendNewMsg = () => {
    if (names === "") {
      alert("수신자를 선택해주세요");
    } else if (inputValue === "") {
      alert("메세지를 입력해주세요");
    } else {
      console.log("inputValue--->", inputValue);
      console.log("보낼 codes---->", codes);
      console.log("보낼 names---->", names);

      const formData = new FormData();
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
      console.log(formattedDate);

      formData.append("msgContents", inputValue);
      formData.append("memCode", token.memCode);
      formData.append("msgDate", formattedDate);
      formData.append("msgDeleteStatus", "N");
      formData.append("codes", codes);

      console.log("dispatch 직전 formdata", formData);

      // sendMessage에 넣는거까지 성공
      dispatch(
        callSendNewMsgAPI({
          form: formData,
        })
      );
    }
  };

  const onClickCheckMember = () => {
    console.log("onClickCheckMember 최종 check --- >", checked);

    // 숫자와 이름으로만 되어있는 배열 2개로 분리
    const splitArray = checked.map((item) => {
      const [number, name] = item.split(" ");
      return { number, name };
    });

    // 분리된 배열 출력
    console.log(splitArray);

    setNames(splitArray.map((item) => " " + item.name));
    setCodes(splitArray.map((item) => " " + item.number));
  };

  const handleColorChange = () => {
    console.log("------ handleColorChange 호출 -----");
    setCheck(true);
    if (token !== null) {
      dispatch(
        callSendMessageAPI({
          memCode: token?.memCode,
        })
      );
      dispatch(
        callRecMessageAPI({
          memCode: token?.memCode,
        })
      );
      dispatch(callOrganizationTreeAPI());

      if (recMessageList !== undefined && recMessageList.length !== 0) {
        if (recMessage.data[0].recMsgCheckStatus === "N") {
          setCheck(true);
          // 해당 msg 코드를 넘겨 상태 N을 Y로 업데이트 하는 API 호출

          dispatch(
            callMsgCheckStatusChangeAPI({
              memCode: token.memCode,
            })
          );
        }
      }
    }
  };

  // 메신저 탭 처리
  const handleTabChange = (selectedTab) => {
    console.log("------ handleTabChange 호출 -----");
    setTab(selectedTab);
  };

  // 받은 메신저 삭제 API 요청
  const onClickRecMsgDelete = (msgCode) => {
    console.log("------ onClickRecMsgDelete 호출 -----");

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(
        callRecDeleteStatusUpdateAPI({
          memCode: token?.memCode,
        })
      );
    }
  };

  // 보낸 메신저 삭제 API 요청
  const onClickSendMsgDelete = (msgCode) => {
    console.log("------ onClickSendMsgDelete 호출 -----");

    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(
        callSendDeleteStatusUpdateAPI({
          msgCode: msgCode,
        })
      );
    }
  };

  // 알림함 탭 처리
  const handleTabChange1 = (selectedTab) => {
    console.log("------ handleTabChange1 호출 -----");

    setTab(selectedTab);
  };

  // 알림 상세보기 페이지 이동
  const onClickAlarmDetail = (payCode) => {
    console.log("------ onClickAlarmDetail 호출 -----");

    navigate(`/main/ApprovalDetail`, { state: { payCode } }, { replace: true });
    window.location.reload();
  };

  // 알림함 API 요청
  const onClickAlarm = () => {
    console.log("------ onClickAlarm 호출 -----");
    setAlarm(true);
    if (token !== null) {
      dispatch(
        callPerAlarmDetailAPI({
          memCode: token?.memCode,
        })
      );
      dispatch(
        callReferencerAPI({
          memCode: token?.memCode,
        })
      );
      dispatch(
        callApprovalAPI({
          memCode: token?.memCode,
        })
      );


    }
    if (perAlarmList !== undefined && perAlarmList.length !== 0) {
      if (perAlarm.data[0].perArmCheckStatus === "N") {
        setAlarm(true);
        // 해당 msg 코드를 넘겨 상태 N을 Y로 업데이트 하는 API 호출

        dispatch(
          callAlarmCheckStatusChangeAPI({
            perArmCode: perAlarm.data[0].perArmCode,
          })
        );
      }
    }
  };

  // 공지사항 클릭 시 작동하는 함수
  const onClickNotice = () => {
    console.log("------ onClickNotice 호출 -----");

    if (firstNotice.data !== undefined && firstNotice.data.length !== 0) {
      if (firstNotice.data[0].allArmCheck === "N") {
        setNotice(true);

        // 상태 N을 Y로 업데이트 하는 API 호출

        dispatch(
          callNoticeCheckStatusChangeAPI({
            allArmCode: firstNotice.data[0].allArmCode,
          })
        );
      }
    }
  };

  const onClickLogout = () => {
    window.localStorage.removeItem("accessToken");
    //로그아웃
    dispatch(callLogoutAPI());

    alert("로그아웃 완료! 메인화면으로 이동");

    navigate("/login", { replace: true });
    window.location.reload();
  };

  const onClickMyPage = () => {
    navigate("/main/mp", { replace: true });
  };

  // 맨처음 실행되는 useEfect
  useEffect(() => {
    console.log("------ useEffect 호출 -----");

    dispatch(
      callFirstRecMessageAPI({
        memCode: token?.memCode,
      })
    );

    dispatch(
      callFirstPerAlarmDetailAPI({
        memCode: token?.memCode,
      })
    );

    dispatch(
      callFirstAllAlarmDetailAPI({
        memCode: token?.memCode,
      })
    );
  }, []);

  // 메신저 리듀서 update 시 작동하는 useEffect
  useEffect(() => {
    console.log("------ deleteStatus useEffect 호출 -----");

    // 메신저 삭제 시 리렌더링 할 수 있게
    dispatch(
      callSendMessageAPI({
        memCode: token?.memCode,
      })
    );
    dispatch(
      callRecMessageAPI({
        memCode: token?.memCode,
      })
    );
  }, [deleteStatus]);

  useEffect(() => {
    console.log("------ sendNewMsgReducer useEffect 호출 -----");

    if (sendNewMsgReducer.status === 200) {
      alert("메세지가 성공적으로 등록되었습니다.");

      setChecked([]);
      setNames("");
      setCodes("");
      setInputValue("");
    }
  }, [sendNewMsgReducer]);

  // recMessage 리듀서의 변화를 감지하는 useEffect
  useEffect(() => {
    console.log("------ recMessage useEffect 호출 -----");

    if (firstRec.data !== undefined && firstRec.data.length !== 0) {
      if (firstRec.data[0].recMsgCheckStatus === "N") {
        setCheck(false);
      }
    }
  }, [firstRec]);

  // perAlarm 리듀서의 변화를 감지하는 useEffect
  useEffect(() => {
    console.log("------ perAlarm useEffect 호출 -----");

    if (firstAlarm.data !== undefined && firstAlarm.data.length !== 0) {
      if (firstAlarm.data[0].perArmCheckStatus === "N") {
        setAlarm(false);
      }
    }
  }, [firstAlarm]);

  // allAlarm 리듀서의 변화를 감지하는 useEffect
  useEffect(() => {
    console.log("------ allAlarm useEffect 호출 -----");

    if (firstNotice.data !== undefined && firstNotice.data.length !== 0) {
      if (firstNotice.data[0].allArmCheck === "N") {
        setNotice(false);
      }
      if (firstNotice.data[0].allArmCheck === "Y") {
        setNotice(true);
      }
    }
  }, [firstNotice]);

  const onClickTree = (event) => {
    const clickedElement = event.target;

    // 클릭된 요소가 트리 노드인지 확인합니다.
    const treeNode = clickedElement.closest(".tui-tree-node");
    if (treeNode) {
      // 트리 노드인 경우에만 처리합니다.
      const nodeValue = treeNode.getAttribute("nodeValue");
      // const nodeValue = treeNode.dataset;
      const nodeId = treeNode.id;
      const nodeText = treeNode.textContent.trim(); // 텍스트 내용을 가져옵니다.

      console.log("Node Value:", nodeValue);
      console.log("Node ID:", nodeId);
      console.log("Node Text:", nodeText);
    }
  };

  //yj: 헤더에 멤버 이름 출력
  const memberDetail = useSelector((state) => state.mypageReducer);
  console.log("memberDetail", memberDetail);

  useEffect(() => {
    console.log("헤더 토큰 검사---->", token);
    console.log("헤더 토큰 token.memCode--->", token?.memCode);

    if (token !== null) {
      dispatch(
        callMemberDetailAPI({
          memCode: token?.memCode,
        })
      );
    }
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
          className={`${coreCSS[`navbar-nav-right`]} ${coreCSS[`d-flex`]} ${
            coreCSS[`align-items-center`]
          }`}
          id="navbar-collapse"
        >
          <div>
            <div>
              안녕하세요,{" "}
              <span style={{ color: "#696cff", fontWeight: "bold" }}>
                {token?.memName} ({token?.memCode})
              </span>
              님
            </div>
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
            style={notice ? { color: "#697a8d" } : { color: "red" }}
          >
            <i
              className="bx bxs-megaphone"
              style={{ fontSize: 27 }}
              onClick={onClickNotice}
            />
          </li>

          {/* 알림함 */}

          <li
            className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${
              coreCSS[`me-3`]
            }`}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasEnd1"
            onClick={() => handleTabChange("sended")}
            style={alarm ? { color: "#697a8d" } : { color: "red" }}
          >
            <i
              className="bx bxs-bell"
              style={{ fontSize: 27 }}
              onClick={onClickAlarm}
            />
          </li>

          {/* 쪽지함 */}
          <li
            className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]} ${
              coreCSS[`me-3`]
            }`}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasEnd"
            onClick={() => handleTabChange1("sended")}
            style={check ? { color: "#697a8d" } : { color: "red" }}
          >
            <i
              className="bx bxs-envelope"
              style={{ fontSize: 27 }}
              onClick={handleColorChange}
            />
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
            <i
              class="bx bxs-user-rectangle"
              style={{ fontSize: 29, color: "#696cff" }}
            />
            {/* <img
                src={profile}
                alt=""
                className={`${coreCSS[`w-px-30`]} ${coreCSS[`h-auto`]} ${
                  coreCSS[`rounded-circle`]
                }`}
              /> */}
          </li>
          <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]}`}>
            <i
              className="bx bx-log-out"
              style={{ fontSize: 28 }}
              onClick={onClickLogout}
            />
          </li>
        </ul>

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
                      나의 결재
                    </span>
                  </li>
                  <li>
                    <span
                      onClick={() => handleTabChange("sending")}
                      style={{
                        cursor: "pointer",
                        color: tab === "sending" ? "blue" : "black", // Example color change
                        fontWeight: tab === "sending" ? "bold" : "normal", // Example font weight change
                        margin: "0px 55px 0px 55px",
                      }}
                    >
                      결재자
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
                      참조자
                    </span>
                  </li>
                </div>
              </ul>
            </div>

            {tab === "sended" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "1000px",
                  overflowY: "auto",
                }}
              >
                {perAlarmList &&
                  perAlarmList.map((perAlarm) => (
                    <div
                      className="btn btn-outline-secondary d-grid w-100"
                      style={{
                        textAlign: "left",
                      }}
                      onClick={() => onClickAlarmDetail(perAlarm.payCode)}
                    >
                      <div>{perAlarm.appDate}</div>
                      <div>
                        결재코드 {perAlarm.appCode}번 {" "}
                        {perAlarm.payKind}이{" "}
                        {perAlarm.appState}
                        되었습니다.{" "}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {tab === "sending" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "1000px",
                  overflowY: "auto",
                }}
              >
              {approval.data &&
                  approval.data.map((approval) => (
                    <div
                      className="btn btn-outline-secondary d-grid w-100"
                      style={{
                        textAlign: "left",
                      }}
                      onClick={() => onClickAlarmDetail(approval.payCode)}
                    >
                      <div>{approval.appDate}</div>
                      <div>
                        결재코드 {approval.appCode}번 {approval.payKind}에 결재자로 지정되었습니다.
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {tab === "newWrite" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "25px",
                }}
              >
                {referencer.data &&
                  referencer.data.map((referencer) => (
                    <div
                      className="btn btn-outline-secondary d-grid w-100"
                      style={{
                        textAlign: "left",
                      }}
                      onClick={() => onClickAlarmDetail(referencer.payCode)}
                    >
                      {/* <div>{approval.appDate}</div> */}
                      <div>
                        결재코드 {referencer.appCode}번 {referencer.payKind}에 참조자로 지정되었습니다.
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        {/* 중간-------------------------- */}

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
                  height: "1000px",
                  overflowY: "auto",
                }}
              >
                {recMessageList &&
                  recMessageList.map((recMessage) => (
                    <div
                      className="messageBox"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{recMessage.aamSendMessenger?.msgDate}</div>
                        <div>
                          <button
                            style={{
                              border: "solid 0px",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              onClickRecMsgDelete(recMessage?.msgCode)
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                      <div>{recMessage.aamSendMessenger?.msgContents}</div>
                      <div>
                        발신자 :{" "}
                        {recMessage.aamSendMessenger?.aamMember.memName}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {tab === "sending" && (
              <div
                style={{
                  marginTop: "10px",
                  height: "1000px",
                  overflowY: "auto",
                }}
              >
                {/* Content for sending tab */}

                {sendMessageList &&
                  sendMessageList.map((sendMessage) => (
                    <div
                      className="messageBox"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{sendMessage?.msgDate}</div>
                        <div>
                          <button
                            style={{
                              border: "solid 0px",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              onClickSendMsgDelete(sendMessage?.msgCode)
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                      <div>{sendMessage?.msgContents}</div>
                      <div>
                        수신자 :
                        {sendMessage.aamRecMessenger &&
                          sendMessage.aamRecMessenger.map((aamRecMessenger) => (
                            <span>
                              {sendMessage.aamRecMessenger !== null
                                ? " " + aamRecMessenger.aamMember.memName
                                : ""}
                              {aamRecMessenger.recMsgCheckStatus === "N"
                                ? "(안읽음)"
                                : "(읽음)"}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
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
                  <button
                    id="receiver"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCenter"
                  >
                    조직도에서 수신자 선택하기
                  </button>
                  <textarea
                    value={names}
                    readOnly={true}
                    style={{
                      width: "350px",
                      height: "auto",
                      minHeight: "100px",
                    }}
                  >
                    수신자
                  </textarea>
                  <div className="col-lg-4 col-md-6">
                    <div className="mt-3"></div>
                  </div>
                </div>
                <div>
                  <div>내용</div>
                  <textarea
                    id="content"
                    type="text"
                    onChange={handleChange}
                    placeholder="최대 200자"
                    maxLength={200}
                    value={inputValue}
                    style={{
                      whiteSpace: "pre-wrap",
                      width: "350px",
                      minHeight: "200px",
                      height: "auto",
                    }}
                  />
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
                  onClick={onClickSendNewMsg}
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
        a
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
              <div>
                <small>
                  {" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 수신할 사람을
                  체크해주세요
                </small>
              </div>
              <div></div>
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
              {/* 조직도 화면 */}
              <div>
                <CheckboxTree
                  nodes={nodes}
                  checked={checked}
                  expanded={expanded}
                  onCheck={
                    checked !== undefined
                      ? (checked) => setChecked(checked)
                      : ""
                  }
                  onExpand={setExpanded}
                  onClick={(e) => onClickGetMemCode(e)}
                  icons={{
                    check: <span className="bx bx-checkbox-checked" />,
                    uncheck: <span className="bx bx-checkbox" />,
                    halfCheck: <span className="bx bx-checkbox-square" />,
                    expandClose: <span className="bx bx-chevron-right" />,
                    expandOpen: <span className="bx bx-chevron-down" />,
                    expandAll: (
                      <span className="rct-icon rct-icon-expand-all" />
                    ),
                    collapseAll: <span className="bx folder-open" />,
                    parentClose: <span className="bx bx-folder" />,
                    parentOpen: (
                      <span
                        className="bx bx-folder-open"
                        style={{ color: "#696cff" }}
                      />
                    ),
                    leaf: <span className="bx bx-user" />,
                  }}
                  searchQuery={searchQuery}
                  searchMethod={searchMethod}
                />
              </div>
              {/* 조직도 화면 끝 */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={onClickCheckMember}
              >
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
