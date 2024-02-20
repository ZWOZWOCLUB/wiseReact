import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import coreCSS from "../../@core/vendor/css/core.module.css";
import payCSS from "../../@core/css/make_schedule.module.css";
import { callSchedulePatternAndDaySearchAPI } from "../../apis/ScheduleAPICalls";
import { callScheduleWorkPatternUpdateAPI } from "../../apis/SchedulePatternUpdateAPICalls";
import { callScheduleWorkPatternInsertAPI } from "../../apis/SchedulePatternInsertAPICalls";
import SchedulePattenAddPattern from "./SchedulePattenAddPattern.js";

function SchedulePattenAddSchedule() {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.schedulePatternReducer);
  const [insertRows, serInsertRows] = useState([]);

  const [sendIndex, setSendIndex] = useState(null);
  const [updateState, setUpdateState] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [sendWokCode, setSendWokCode] = useState(0);

  useEffect(() => {
    dispatch(callSchedulePatternAndDaySearchAPI());
  }, []);
  console.log("!!!!!!!!!!!!!!!!!!!!allList", allList);

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const onClickMonToSun = (index) => {
    setSelectedDayIndex(index);
    const selectedDay = document.getElementsByClassName(payCSS["monToSun"])[
      index
    ];
    selectedDay.style.background = selectedColor;
    console.log("$$$$$$$$$$$$$$$", index, selectedDayIndex);
  };

  const [scheduleForm, setScheduleForm] = useState([
    {
      schCode: "",
      schType: 0,
      schStartDate: "",
      schEndDate: "",
      schColor: "N",
      schDeleteStatus: "",
      wokCode: "",
      dayCode: "",
    },
  ]);

  const handleAddRow = () => {
    serInsertRows((prevRows) => [...prevRows, {}]);
    setScheduleForm((prevForms) => ({
      ...prevForms,

      schCode: "",
      schType: 0,
      schStartDate: "",
      schEndDate: "",
      schColor: "N",
      schDeleteStatus: "",
      wokCode: "",
      dayCode: "",
    }));
  };

  const insertSchedule = (e) => {
    const { name, value } = e.target;
  };
  console.log("scheduleForm+++++++++++++++++++++++", scheduleForm);

  return (
    <>
      {Array.isArray(allList) && allList.length > 0
        ? allList.map((p, index) => (
            <div id={`${payCSS["borderCardWrapper"]}`} key={index}>
              <div className={`${payCSS["top"]}`}>
                <div className={`${payCSS["top_left"]}`}>
                  <div className={`${payCSS["nickname"]}`}>
                    <input
                      type="text"
                      className={`${payCSS["nickname2"]}`}
                      placeholder={p.schType}
                    />
                  </div>
                  <div className={`${payCSS["hours"]}`}>
                    <i className={"bx bxs-alarm"} />
                    <div style={{ marginTop: 3 }}>&nbsp; 35시간</div>
                  </div>
                </div>
                <div className={`${payCSS["top_right"]}`}>
                  <div className={`${payCSS["schedule_date"]}`}>
                    <input
                      type="Date"
                      className={`${payCSS["period"]}`}
                      value={p.schStartDate}
                    />
                    <input
                      type="Date"
                      className={`${payCSS["period"]}`}
                      value={p.schEndDate}
                    />
                  </div>
                  <button className={`${payCSS["check"]}`}>
                    <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                    <div style={{ marginTop: 3 }}>&nbsp; 적용</div>
                  </button>
                  <button className={`${payCSS["threeDot"]}`}>
                    <i
                      className={`${payCSS["bx"]} ${payCSS["bx-dots-vertical-rounded"]}`}
                      style={{ marginTop: 5 }}
                    />
                  </button>
                </div>
              </div>
              <div className={`${payCSS["middle"]}`}>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 1
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>월</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 2
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>화</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 3
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>수</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 4
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  {" "}
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>목</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 5
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  {" "}
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>금</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 6
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  {" "}
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>토</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
                <div
                  className={`${payCSS["monToSun"]}`}
                  onClick={() => {
                    onClickMonToSun(index);
                  }}
                  style={{
                    background: p.patternDayList.some(
                      (day) => day.patternDayID.dayCode === 7
                    )
                      ? p.patternList.wokColor
                      : "",
                  }}
                >
                  {" "}
                  <div className={`${payCSS["forColor"]}`}>
                    <div className={`${payCSS["first"]}`}>
                      <strong>일</strong>
                    </div>
                    <div className={`${payCSS["second"]}`}>데이</div>
                    <div className={`${payCSS["third"]}`}>
                      <small>07:00-15:00</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${payCSS["bottom"]}`}>
                <button className={`${payCSS["plus-icon"]}`}>
                  <i
                    className={"bx bx-plus"}
                    style={{ fontSize: "1.5rem", color: "#fff" }}
                  />
                </button>
                {/* {p.allowanceList.map((allowance, idx) => (
                        <div className={`${payCSS["name"]}`}>
                          <span key={idx}>{allowance.memberList.memName}</span>
                        </div>
                      ))} */}
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default SchedulePattenAddSchedule;
