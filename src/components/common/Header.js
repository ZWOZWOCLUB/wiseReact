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
import { callMsgCheckStatusChangeAPI } from "../../apis/AAMAPICalls.js";
import { callRecDeleteStatusUpdateAPI } from "../../apis/AAMAPICalls.js";
import { callSendDeleteStatusUpdateAPI } from "../../apis/AAMAPICalls.js";
import { callAlarmCheckStatusChangeAPI } from "../../apis/AAMAPICalls.js";
import { callAllAlarmDetailAPI } from "../../apis/AAMAPICalls.js";
import { callNoticeCheckStatusChangeAPI } from "../../apis/AAMAPICalls.js";
import { callSendNewMsgAPI } from "../../apis/AAMAPICalls.js";
import Tree from "tui-tree";
import "tui-tree/dist/tui-tree.css";
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";
import CheckboxTree from "react-checkbox-tree";
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
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const perAlarm = useSelector((state) => state.aamPerAlarmReducer);
  const allAlarm = useSelector((state) => state.aamAllAlarmReducer);
  const sendMessage = useSelector((state) => state.aamSendMessageReducer);
  const recMessage = useSelector((state) => state.aamRecMessageReducer);
  const deleteStatus = useSelector((state) => state.aamPutReducer);
  const departmentList = useSelector((state) => state.organizationChartReducer);
  const alarmReducer = useSelector((state) => state.aamPutAlarmReducer);
  const sendNewMsgReducer = useSelector((state) => state.aamSendNewMsgReducer);
  
  const perAlarmList = perAlarm.data;
  const sendMessageList = sendMessage.data;
  const recMessageList = recMessage.data;
  const allAlarmList = allAlarm.data;
  const sendNewMsgReducerDetail = sendNewMsgReducer.data;

  const [checked, setChecked] = useState([]);
  const [names, setNames] = useState('');
  const [codes, setCodes] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(["동물원병원"]);
  const [inputValue, setInputValue] = useState('');

  const [form, setForm] = useState({
    msgContents: '',
    memCode: token.memCode,
    msgDate: new Date(),
    msgDeleteStatus: 'N',
  });

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length <= 200) {
      setInputValue(value);
    }
    else {
      alert('최대 200자까지만 입력이 가능합니다.')
    }
  };

  const onClickGetMemCode = (e) => {
    console.log(e);
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

  // if(recMessageList !== undefined){
  //   console.log('recMessage[0].recMsgCheckStatus--->',recMessage.data[0].recMsgCheckStatus);
  //   if(recMessage.data[0].recMsgCheckStatus === 'N'){
  //     console.log('setCheck false로 상태 변경');
  //     // setCheck(false);
  //   }
  // }

  
  const onClickSendNewMsg = () => {

    if(inputValue === ''){
      alert('메세지를 입력해주세요');
    }
    else {
      console.log('inputValue--->',inputValue);
      console.log('보낼 codes---->',codes);
      console.log('보낼 names---->',names);

    const formData = new FormData();

    formData.append("msgContents", inputValue);
    formData.append("memCode", token.memCode);
    formData.append("msgDate", new Date().toLocaleDateString('en-CA'));
    formData.append("msgDeleteStatus", 'N');

    console.log('dispatch 직전 formdata', formData);
   
    // sendMessage에 넣는거까지 성공
    dispatch(
      callSendNewMsgAPI({
        form: formData,
      })
    );

    // 이제 recMessage에 msgCode랑 memCode 넣으면 됨

    // sendNewMsgReducerDetail --> msgCode


    

    }
    

  };


  const onClickCheckMember = () => {
    console.log('onClickCheckMember 최종 check --- >',checked);

    // 숫자와 이름으로만 되어있는 배열 2개로 분리
  const splitArray = checked.map(item => {
    const [number, name] = item.split(' ');
    return { number, name };
  });

  // 분리된 배열 출력
  console.log(splitArray);

  setNames(splitArray.map(item => " "+item.name));
  setCodes(splitArray.map(item => " "+item.number));

  };

  const handleColorChange = () => {
    console.log("------ handleColorChange 호출 -----");
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
      dispatch(callOrganizationTreeAPI());

      if (recMessageList !== undefined && recMessageList.length !== 0) {
        if (recMessage.data[0].recMsgCheckStatus === "N") {
          setCheck(true);
          // 해당 msg 코드를 넘겨 상태 N을 Y로 업데이트 하는 API 호출

          dispatch(
            callMsgCheckStatusChangeAPI({
              memCode: recMessage.data[0].msgCode,
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
          msgCode: msgCode,
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

    navigate(`/main/ApprovalDetail`, { state: { payCode }}, {replace:true});
    window.location.reload();
  };

  // 알림함 API 요청
  const onClickAlarm = () => {
    console.log("------ onClickAlarm 호출 -----");

    if (token !== null) {
      dispatch(
        callPerAlarmDetailAPI({
          memCode: token.memCode,
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

    if (allAlarmList !== undefined && allAlarmList.length !== 0) {
      if (allAlarm.data[0].allArmCheck === "N") {
        setNotice(true);

        // 상태 N을 Y로 업데이트 하는 API 호출

        dispatch(
          callNoticeCheckStatusChangeAPI({
            allArmCode: allAlarm.data[0].allArmCode,
          })
        );
      }
    }
  };

  // const onClickTree = (target) => {
  //   // 클릭된 요소의 정보를 출력합니다.
  //   console.log(target);
  // };

  const onClickLogout = () => {
    alert("로그아웃 합니다.");
    window.localStorage.removeItem("accessToken");
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
      callRecMessageAPI({
        memCode: token.memCode,
      })
    );

    dispatch(
      callPerAlarmDetailAPI({
        memCode: token.memCode,
      })
    );

    dispatch(
      callAllAlarmDetailAPI({
        memCode: token.memCode,
      })
    );

    if (allAlarmList !== undefined && allAlarmList.length !== 0) {
      if (allAlarm.data[0].allArmCheck === "N") {
        setNotice(false);
      }
    }

    if (perAlarmList !== undefined && perAlarmList.length !== 0) {
      if (perAlarm.data[0].perArmCheckStatus === "N") {
        setAlarm(false);
      }
    }

    if (recMessageList !== undefined && recMessageList.length !== 0) {
      if (recMessage.data[0].recMsgCheckStatus === "N") {
        setCheck(false);
      }
    }
  }, []);

  // 메신저 리듀서 update 시 작동하는 useEffect
  useEffect(() => {
    console.log("------ deleteStatus useEffect 호출 -----");

    // 메신저 삭제 시 리렌더링 할 수 있게
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
  }, [deleteStatus]);

  

  // 부서 트리 출력 useEffect
  // useEffect(() => {
  //   console.log("------ departmentList useEffect 호출 -----");

  //   if (departmentList && departmentList.children) {
  //     const options = {
  //       data: [
  //         {
  //           text: departmentList.depName,
  //           children: departmentList.children.map((dep) => ({
  //             text: dep.depName === "인사팀" ? dep.depName : dep.depName,
  //             children:
  //               dep.depName === "인사팀"
  //                 ? dep.memberList.map((mem) => ({
  //                     text: mem.memName + " " + mem.posName,
  //                     nodeValue: mem.memCode,
  //                     data: mem.memCode,
  //                     id: mem.memCode,
  //                   }))
  //                 : dep.children.map((chi) => ({
  //                     text: chi.depName,
  //                     state: "closed",
  //                     children: chi.memberList.map((mem) => ({
  //                       text: mem.memName + " " + mem.posName,
  //                       nodeValue: mem.memCode,
  //                       data: mem.memCode,
  //                       id: mem.memCode,
  //                     })),
  //                   })),
  //           })),
  //         },
  //       ],
  //       nodeIdPrefix: "tui-tree-node-",
  //       nodeDefaultState: "opened",
  //       stateLabels: {
  //         opened: "-",
  //         closed: "+",
  //       },
  //     };

  //     const tree = new Tree("#tree", options);


  // // 클릭 이벤트 핸들러를 추가합니다.
  // tree.on('click', (event) => {
  //   const node = event.node;
  //   // nodeValue가 있는지 확인하고 있으면 콘솔에 출력합니다.
  //   if (node.nodeValue) {
  //     console.log("Node Value:", node.nodeValue);
  //   }
  // });

  //   }
  // }, [departmentList]);

  // recMessage 리듀서의 변화를 감지하는 useEffect
  useEffect(() => {
    console.log("------ recMessage useEffect 호출 -----");

    if (recMessageList !== undefined && recMessageList.length !== 0) {
      if (recMessage.data[0].recMsgCheckStatus === "N") {
        setCheck(false);
      }
      if (recMessage.data[0].recMsgCheckStatus === "Y") {
        setCheck(true);
      }
    }
  }, [recMessage]);

  // perAlarm 리듀서의 변화를 감지하는 useEffect
  useEffect(() => {
    console.log("------ perAlarm useEffect 호출 -----");

    if (perAlarmList !== undefined && perAlarmList.length !== 0) {
      if (perAlarm.data[0].perArmCheckStatus === "N") {
        setAlarm(false);
      }
      if (perAlarm.data[0].perArmCheckStatus === "Y") {
        setAlarm(true);
      }
    }
  }, [perAlarm]);

  // allAlarm 리듀서의 변화를 감지하는 useEffect
  useEffect(() => {
    console.log("------ allAlarm useEffect 호출 -----");

    if (allAlarmList !== undefined && allAlarmList.length !== 0) {
      if (allAlarm.data[0].allArmCheck === "N") {
        setNotice(false);
      }
      if (allAlarm.data[0].allArmCheck === "Y") {
        setNotice(true);
      }
    }
  }, [allAlarm]);

  const onClickTree = (event) => {
    const clickedElement = event.target;
  
    // 클릭된 요소가 트리 노드인지 확인합니다.
    const treeNode = clickedElement.closest('.tui-tree-node');
    if (treeNode) {
      // 트리 노드인 경우에만 처리합니다.
      const nodeValue = treeNode.getAttribute('nodeValue');
      // const nodeValue = treeNode.dataset;
      const nodeId = treeNode.id;
      const nodeText = treeNode.textContent.trim(); // 텍스트 내용을 가져옵니다.
  
      console.log("Node Value:", nodeValue);
      console.log("Node ID:", nodeId);
      console.log("Node Text:", nodeText);
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
              <img
                src={profile}
                alt=""
                className={`${coreCSS[`w-px-30`]} ${coreCSS[`h-auto`]} ${
                  coreCSS[`rounded-circle`]
                }`}
              />
            </li>
            <li className={`${coreCSS[`nav-item`]} ${coreCSS[`lh-1`]}`}>
              <i
                className="bx bx-log-out"
                style={{ fontSize: 28 }}
                onClick={onClickLogout}
              />
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
                        onClick={() => onClickAlarmDetail(perAlarm.payCode)}
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
                        <div>{recMessage.aamSendMessenger.msgDate}</div>
                        <div>
                          <button
                            style={{
                              border: "solid 0px",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              onClickRecMsgDelete(recMessage.msgCode)
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                      <div>{recMessage.aamSendMessenger.msgContents}</div>
                      <div>
                        발신자 : {recMessage.aamSendMessenger.aamMember.memName}
                      </div>
                    </div>
                  ))}
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
                        <div>{sendMessage.msgDate}</div>
                        <div>
                          <button
                            style={{
                              border: "solid 0px",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              onClickSendMsgDelete(sendMessage.msgCode)
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                      <div>{sendMessage.msgContents}</div>
                      <div>
                        수신자 : {sendMessage.aamRecMessenger.aamMember.memName}
                      </div>
                    </div>
                  ))}
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
                    value={names}
                  />
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
                  whiteSpace: 'pre-wrap', 
                  width: '300px', 
                  height: '200px' }}
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
                <small> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 수신할 사람을 체크해주세요</small>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* 조직도 화면 */}
              <div>
                <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={setExpanded}
                onClick={(e) => onClickGetMemCode(e)}
                icons={{
                  check: <span className="bx bx-checkbox-checked" />,
                  uncheck: <span className="bx bx-checkbox" />,
                  halfCheck: <span className="bx bx-checkbox-square" />,
                  expandClose: <span className="bx bx-chevron-right" />,
                  expandOpen: <span className="bx bx-chevron-down" />,
                  expandAll: <span className="rct-icon rct-icon-expand-all" />,
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
