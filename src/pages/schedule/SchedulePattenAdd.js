import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import coreCSS from "../../@core/vendor/css/core.module.css";
import payCSS from "../../@core/css/make_schedule.module.css";
import { callSchedulePatternAndDaySearchAPI } from "../../apis/ScheduleAPICalls";
import { callSchedulePatternSearchAPI } from "../../apis/SchedulePatternAPICalls";
function SchedulePattenAdd() {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.scheduleReducer);
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    dispatch(callSchedulePatternAndDaySearchAPI());
  }, []);
  console.log("!!!!!!!!!!!!!!!!!!!!", allList);

  useEffect(() => {
    dispatch(callSchedulePatternSearchAPI());
  }, []);
  console.log("!!!!!!!!!!!!!!!!!!!!", patternList);

  return (
    <div className={`${payCSS["allWrapper"]}`}>
      <div className={`${payCSS["schedule_head"]}`}>
        <div className={`${payCSS["head_left"]}`}>
          <div className="bx bxs-briefcase" style={{ fontSize: "2rem" }}></div>
          <div style={{ fontWeight: 700, fontSize: "1.5rem" }}>
            근무 패턴 등록
          </div>
        </div>
        <div className={`${payCSS["head_right"]}`}>
          <div className={`${payCSS["new_group"]} `}>+ 새 근무 그룹</div>
          <div className={`${payCSS["bx"]} ${payCSS["bx-x"]}`} id="close"></div>
        </div>
      </div>
      <div className={`${payCSS["schedule_content"]}`}>
        <div className={`${payCSS["side_schedule"]}`} id="side_schedule">
          <div className={`${payCSS["contentLeft"]}`}>
            <div className={`${payCSS["newSchedule"]}`} id="newGroup">
              <strong>
                <i
                  className={"bx bx-plus"}
                  style={{ fontSize: "1.5rem", paddingBottom: "5px" }}
                />
                새 근무 편성
              </strong>
            </div>
            {Array.isArray(patternList) && patternList.length > 0
              ? patternList.map((p, index) => (
                  <div className={`${payCSS["work"]}`} id="work" key={index}>
                    <div className={`${payCSS["content_left"]}`}>
                      <div
                        className={`${payCSS["color_box"]}`}
                        style={{ backgroundColor: p.schColor }}
                      ></div>
                    </div>
                    <div className={`${payCSS["content_right"]}`}>
                      <div className={`${payCSS["contentRightWrapper"]}`}>
                        <div className={`${payCSS["contentRightWrapper2"]}`}>
                          <div
                            className={`${payCSS["schedule"]}`}
                            style={{ marginTop: 4 }}
                          >
                            {p.schType}
                          </div>
                          <button
                            className={`${payCSS["bx"]} ${coreCSS["bx-dots-vertical-rounded"]}`}
                            style={{
                              marginRight: 15,
                              marginTop: 10,
                              border: 0,
                              backgroundColor: "rgba(0, 0, 0, 0)",
                            }}
                          />
                        </div>
                        <div className={`${payCSS["time"]}`}>
                          {formatTime(p.patternList.wokStartTime)} ~
                          {formatTime(p.patternList.wokEndTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className={`${payCSS["main_content"]}`}>
          <div className={`${payCSS["border_card"]}`}>
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
                          <i
                            className={"bx bx-check"}
                            style={{ marginRight: 1 }}
                          />
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 1
                          )
                            ? p.schColor
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 2
                          )
                            ? p.schColor
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 3
                          )
                            ? p.schColor
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 4
                          )
                            ? p.schColor
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 5
                          )
                            ? p.schColor
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 6
                          )
                            ? p.schColor
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
                        style={{
                          background: p.patternDayList.some(
                            (day) => day.patternDayID.dayCode === 7
                          )
                            ? p.schColor
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
                      {p.allowanceList.map((allowance, idx) => (
                        <div className={`${payCSS["name"]}`}>
                          <span key={idx}>{allowance.memberList.memName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePattenAdd;
