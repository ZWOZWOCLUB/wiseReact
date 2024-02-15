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
import {
  callSchedulePatternSearchAPI,
  callScheduleWorkPatternInsertAPI,
} from "../../apis/SchedulePatternAPICalls";

function SchedulePattenAdd() {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.schedulePatternReducer);
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
  const [showModal, setShowModal] = useState(false);

  const [pattern, setPattern] = useState({
    wokStartTime: "",
    wokRestTime: "",
    wokEndTime: "",
    wokDeleteState: "N",
    wokColor: "",
    wokType: "",
  });

  const onChangeHandler = (e) => {
    setPattern({
      ...pattern,
      [e.target.name]: e.target.value,
    });
  };
  console.log(pattern);

  useEffect(() => {
    dispatch(callSchedulePatternAndDaySearchAPI());
  }, []);
  console.log("!!!!!!!!!!!!!!!!!!!!", allList);

  useEffect(() => {
    dispatch(callSchedulePatternSearchAPI());
  }, []);
  console.log("!!!!!!!!!!!!!!!!!!!!", patternList);

  const onClickInsertPattern = () => {
    console.log("클릭");
    dispatch(
      callScheduleWorkPatternInsertAPI({
        pattern: pattern,
      })
    );
    setPattern({
      wokStartTime: "",
      wokRestTime: "",
      wokEndTime: "",
      wokDeleteState: "N",
      wokColor: "",
      wokType: "",
    });
  };

  const onClickCloseModal = () => {
    setPattern({
      wokStartTime: "",
      wokRestTime: "",
      wokEndTime: "",
      wokDeleteState: "N",
      wokColor: "",
      wokType: "",
    });
  };

  console.log(showModal);
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
            <div
              className={`${payCSS["newSchedule"]}`}
              id="newGroup"
              data-bs-toggle="modal"
              data-bs-target="#modalCenter1"
            >
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
                        style={{ backgroundColor: p.wokColor }}
                      ></div>
                    </div>
                    <div className={`${payCSS["content_right"]}`}>
                      <div className={`${payCSS["contentRightWrapper"]}`}>
                        <div className={`${payCSS["contentRightWrapper2"]}`}>
                          <div className={`${payCSS["schedule"]}`}>
                            {p.wokType}
                          </div>
                          <div className="dropdown">
                            <button
                              className="btn p-0"
                              type="button"
                              id="transactionID"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div
                              className="dropdown-menu dropdown-menu-end"
                              aria-labelledby="transactionID"
                            >
                              <span className="dropdown-item">수정</span>
                              <span className="dropdown-item">삭제</span>
                            </div>
                          </div>
                        </div>
                        <div className={`${payCSS["time"]}`}>
                          {formatTime(p.wokStartTime)} ~
                          {formatTime(p.wokEndTime)}
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
                      {p.allowanceList.map((allowance, idx) => (
                        <div className={`${payCSS["name"]}`}>
                          <span key={idx}>{allowance.memberList.memName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              : ""}

            <div
              className="modal fade"
              id="modalCenter1"
              tabIndex="-1"
              aria-hidden="true"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className={`${payCSS["modalTotalWrapper"]}`}>
                    <h5 className={`${payCSS["modalTopText"]}`}>
                      <i
                        className="bx bxs-briefcase"
                        style={{ fontSize: "2rem", marginRight: "1rem" }}
                      ></i>
                      새 근무편성
                    </h5>
                    <hr />
                    <div className={`${payCSS["modalTopWrapper"]}`}>
                      <input
                        type="color"
                        className={`${payCSS["inputColor"]}`}
                        name="wokColor"
                        onChange={onChangeHandler}
                      />
                      <label className={`${payCSS["colorLabel"]}`}>
                        편성명
                        <input
                          type="text"
                          className={`${payCSS["patternName"]}`}
                          name="wokType"
                          onChange={onChangeHandler}
                          value={pattern.wokType}
                        />
                      </label>
                    </div>
                    <div className={`${payCSS["modalMiddleTotalWrapper"]}`}>
                      <div className={`${payCSS["modalMiddleWrapper"]}`}>
                        <div className={`${payCSS["modalMiddleText"]}`}>
                          근무시작시간
                        </div>
                        <input
                          type="time"
                          name="wokStartTime"
                          className={`${payCSS["timeInput"]}`}
                          onChange={onChangeHandler}
                        />
                      </div>
                      <div className={`${payCSS["modalMiddleWrapper"]}`}>
                        <div className={`${payCSS["modalMiddleText"]}`}>
                          근무종료시간
                        </div>
                        <div id="timepicker-wrapper"></div>
                        <input
                          type="time"
                          className={`${payCSS["timeInput"]}`}
                          onChange={onChangeHandler}
                          name="wokEndTime"
                          value={pattern.wokEndTime}
                        />
                      </div>
                      <div className={`${payCSS["modalMiddleWrapper"]}`}>
                        <div className={`${payCSS["modalMiddleText"]}`}>
                          휴게시간
                        </div>
                        <select
                          className={`${payCSS["timeSelect"]}`}
                          onChange={onChangeHandler}
                          name="wokRestTime"
                        >
                          <option value="">--선택--</option>
                          <option value="00:30:00">00:30</option>
                          <option value="01:00:00">01:00</option>
                          <option value="01:30:00">01:30</option>
                          <option value="02:00:00">02:00</option>
                          <option value="02:30:00">02:30</option>
                          <option value="03:00:00">03:00</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div className={`${payCSS["modalBtnWrapper"]}`}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        style={{ marginRight: "1rem" }}
                        onClick={onClickInsertPattern}
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                        onClick={onClickCloseModal}
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePattenAdd;
