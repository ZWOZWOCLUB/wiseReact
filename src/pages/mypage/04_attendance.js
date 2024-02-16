import "./core.css";
import "./01_profileInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { decodeJwt } from "../../utils/tokenUtils.js";
import { callATTAPI } from "../../apis/MyPageAPICalls.js";
// import Calendar from "@toast-ui/react-calendar";
// import "tui-calendar/dist/tui-calendar.css";
import Calendar, { OnClickFunc } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MPAttendance() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  const att = useSelector((state) => state.mpATTReducer);
  const attDetail = att.data;


  // 출근 날짜 목록. 예시로 임의로 설정합니다.
  const workDays = ['2024-02-01', '2024-02-05', '2024-02-10'];

  // 날짜 셀의 클래스 이름을 지정하는 함수
  const tileClassName = ({ date }) => {
    // 날짜를 문자열로 변환하여 출근 날짜 목록에 포함되는지 확인합니다.
    const dateString = date.toISOString().split('T')[0];
    if (workDays.includes(dateString)) {
      // 출근 날짜인 경우 'work-day' 클래스를 반환하여 파란색 배경으로 설정합니다.
      return 'work-day';
    }
    // 출근 날짜가 아닌 경우 'non-work-day' 클래스를 반환하여 빨간색 배경으로 설정합니다.
    return 'non-work-day';
  };

  


  useEffect(() => {
    if (token !== null) {
      dispatch(
        callATTAPI({
          memCode: 2,
          date: '2024-01-01'
          // date: today,
          // memCode: token.memCode
          // 원래 토큰에서 memCode를 넘겨줘야하지만 사번 1번의 샘플데이터가 없어 2번으로 지정 후 임의로 데이터를 불러옴
          // 마찬가지로 date도 useState로 캘린더에서 클릭한 값을 넘겨줘야함(기본값은 오늘 날짜로)
        })
      );
    }
  }, []);

  const onClickDayHandler = (value, event) => {

    const year = value.getFullYear();
    const month = ('0' + (value.getMonth() + 1)).slice(-2);
    const day = ('0' + value.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    console.log('Clicked day:', formattedDate);

    dispatch(
      callATTAPI({
        memCode: 2,
        date: formattedDate,
        // memCode: token.memCode
        // 원래 토큰에서 memCode를 넘겨줘야하지만 사번 1번의 샘플데이터가 없어 2번으로 지정 후 임의로 데이터를 불러옴
        // 마찬가지로 date도 useState로 캘린더에서 클릭한 값을 넘겨줘야함(기본값은 오늘 날짜로)
      })
    );
  };

  useEffect(() => {
    if (token !== null) {
     
    }
  }, [att]);

  // useState 훅의 초기값으로 현재 날짜를 넣어줌
  const [today, setToday] = useState(new Date());

  // onChange 이벤트에 넣어줘서 날짜가 지날 때마다 today값이 업데이트 되도록 구현
  const onChangeToday = () => {
    setToday(today);
  };

  
  console.log();

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
                          </div>
                          <div className="card-body">
                            {/* 캘린더 시작 */}
                            {/* https://velog.io/@hhjj0513/TIL-React-캘린더-react-calendar-라이브러리-TypeScript-적용- */}
                            <div>
                              <Calendar
                              onChange={setToday}
                              value={today}
                              style={{ width: '100%' }}
                              onClickDay={onClickDayHandler}
                              tileClassName={tileClassName}
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
                          "로딩중"
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
