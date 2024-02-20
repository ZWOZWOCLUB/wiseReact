import "./core.css";
import "./01_profileInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callATTAPI } from "../../apis/MyPageAPICalls.js";
import { callATTListAPI } from "../../apis/MyPageAPICalls.js";
// import Calendar from "@toast-ui/react-calendar";
// import "tui-calendar/dist/tui-calendar.css";
import Calendar, { OnClickFunc } from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import moment from "moment";

function MPAttendance() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate1 = `${year}-${month}-${day}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const att = useSelector((state) => state.mpATTReducer);
  const attList = useSelector((state) => state.mpATTListReducer);
  const attDetail = att.data;

  const [value, onChange] = useState(new Date()); // 초기값은 현재 날짜
  const [checkDate, setCheckDate] = useState(formattedDate1); // 초기값은 현재 날짜

  // 가장 처음 실행되는 useEffect
  useEffect(() => {
    if (token !== null) {
      dispatch(
        callATTAPI({
          memCode: 2,
          date: checkDate,

          // memCode: token.memCode
          // 사번 1번의 샘플데이터가 없어 2번으로 지정 후 임의로 데이터를 불러옴
        })
      );
      dispatch(
        callATTListAPI({
          memCode: 2,
          // memCode: token.memCode
          // 사번 1번의 샘플데이터가 없어 2번으로 지정 후 임의로 데이터를 불러옴
        })
      );
    }
  }, []);

  // 일기 작성 날짜 리스트
  const dayList = ["2024-02-10", "2024-02-02", "2024-02-14"];
  const dayList = ["2024-02-10", "2024-02-02", "2024-02-14"];

  // 공휴일 목록
  const holidayList = [
    "01-01",
    "02-05",
    "02-06",
    "02-07",
    "02-08",
    "05-01",
    "06-06",
    "08-15",
    "01-01",
    "02-05",
    "02-06",
    "02-07",
    "02-08",
    "05-01",
    "06-06",
    "08-15",
  ];
  // const squaredNumbers = attList.map((number) => {
  //   return number.attWorkDate;
  // });
  // console.log('squaredNumbers',squaredNumbers);

  // 날짜 리스트를 보고 해당 날짜에 css를 추가하는 함수
  const addContent = (date) => {
    const dayOfWeek = moment(date).format("dddd");

    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    // const contents = [];
    // const today = moment(); // 현재 날짜를 가져옴
    const yesterday = moment().subtract(1, "days");
    // const dateString = moment(date).format("YYYY-MM-DD");

    const attListDetail = attList.data;
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];

    if (attListDetail !== undefined) {
      {
        attListDetail.map((item) => {
          if (item.attStatus === "출근") {
            arr.push(item.attWorkDate);
          }
          if (item.attStatus === "결근") {
            arr2.push(item.attWorkDate);
          }
          if (item.attStatus === "지각") {
            arr3.push(item.attWorkDate);
          }
          if (item.attStatus === "조퇴") {
            arr4.push(item.attWorkDate);
          }
        });
      }
    }

    // date(각 날짜)가 리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (holidayList.find((day) => day === moment(date).format("MM-DD"))) {
      return (
        <div className="diaryContent" style={{ backgroundColor: "yellow" }}>
          공휴일
        </div>
      );
    } 
    // else if(dayOfWeek === "Saturday" || dayOfWeek === "Sunday"){
    //   return <div className="diaryContent"></div>;
    // }
    else {
      if (arr.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
        return (
          <div className="diaryContent" style={{ backgroundColor: "blue" }}>
            출근
          </div>
        );
      }
      if (arr2.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
        return (
          <div className="diaryContent" style={{ backgroundColor: "red" }}>
            결근
          </div>
        );
      }
      if (arr3.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
        return (
          <div className="diaryContent" style={{ backgroundColor: "purple" }}>
            지각
          </div>
        );
      }
      if (arr4.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
        return (
          <div className="diaryContent" style={{ backgroundColor: "green" }}>
            조퇴
          </div>
        );
      }
    }
  };

  // 날짜를 클릭하면 checkDate statue를 변경하는 onClick
  const onClickDayHandler = (value, event) => {
    console.log("선택한 날짜의 년도:", value.getFullYear());
    console.log("선택한 날짜의 월:", value.getMonth() + 1);

    const year = value.getFullYear();
    const month = ("0" + (value.getMonth() + 1)).slice(-2);
    const day = ("0" + value.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Clicked day:", formattedDate);

    setCheckDate(formattedDate);
  };

  // 날짜를 클릭할때마다 실행되는 useEffect
  useEffect(() => {
    dispatch(
      callATTAPI({
        memCode: 2,
        date: checkDate,
        // memCode: token.memCode
        // 원래 토큰에서 memCode를 넘겨줘야하지만 사번 1번의 샘플데이터가 없어 2번으로 지정 후 임의로 데이터를 불러옴
      })
    );
  }, [checkDate]);

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
                      <i className="bx bx-user me-1"></i> 프로필 정보
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
                  <h5 className="card-header">출퇴근 정보</h5>
                  <hr className="my-0" />

                  <div className="container-xxl flex-grow-1 container-p-y">
                    <div className="row">
                      <div className="col-6 mb-4">
                        <div className="card h-100">
                          <div className="card-header d-flex align-items-center justify-content-between">
                            <h5 className="card-title m-0 me-2">기록</h5>
                            <small>*최근 3개월 정보까지 가져옵니다.</small>
                          </div>
                          <div className="card-body">
                            {/* 캘린더 시작 */}
                            {/* https://velog.io/@hhjj0513/TIL-React-캘린더-react-calendar-라이브러리-TypeScript-적용- */}
                            <div>
                              <Calendar
                                onChange={onChange}
                                value={value}
                                onClickDay={onClickDayHandler}
                                tileContent={({ date }) => addContent(date)}
                              <Calendar
                                onChange={onChange}
                                value={value}
                                onClickDay={onClickDayHandler}
                                tileContent={({ date }) => addContent(date)}
                              />
                            </div>
                            {/* 캘린더 끝 */}
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-4">
                        {attDetail ? (
                          <div>
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
                                </div>
                                <span className="fw-semibold d-block mb-1">
                                  출근 시각
                                </span>
                                <h3 className="card-title mb-2">
                                  {attDetail.attStartTime}
                                </h3>
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
                                </div>
                                <span className="fw-semibold d-block mb-1">
                                  퇴근 시각
                                </span>
                                <h3 className="card-title mb-2">
                                  <h3 className="card-title mb-2">
                                    {attDetail.attEndTime
                                      ? attDetail.attEndTime
                                      : "퇴근전"}
                                  </h3>
                                </h3>
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
                                </div>
                                <span className="fw-semibold d-block mb-1">
                                  총 근무 시간
                                </span>
                                <h3 className="card-title mb-2">
                                  {attDetail.totalWork}
                                </h3>
                                <small className="text-success fw-semibold">
                                  쉬는시간 제외
                                </small>
                              </div>
                            </div>
                          </div>
                        ) : (
                          "샘플데이터 없음"
                        )}
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
  );
}

export default MPAttendance;
