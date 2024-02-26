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
import { callSchedulePatternSearchAPI } from "../../apis/SchedulePatternAPICalls";
import { callScheduleWorkPatternUpdateAPI } from "../../apis/SchedulePatternUpdateAPICalls";
import { callScheduleWorkPatternInsertAPI } from "../../apis/SchedulePatternInsertAPICalls";
import { callScheduleWorkPatterDeleteAPI } from "../../apis/SchedulePatternDeleteAPICalls";

const SchedulePattenAddPattern = (props) => {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.schedulePatternReducer);
  const [insertRows, serInsertRows] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const updateReducer = useSelector(
    (state) => state.schedulePatternUpdateReducer
  );
  const insertReducer = useSelector(
    (state) => state.schedulePatternInsertReducer
  );
  const deleteReducer = useSelector(
    (state) => state.schedulePatternDeleteReducer
  );
  const [sendIndex, setSendIndex] = useState(null);
  const [updateState, setUpdateState] = useState(false);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(0);
  const [sendWokCode, setSendWokCode] = useState(0);

  const [pattern, setPattern] = useState({
    wokStartTime: "",
    wokCode: 0,
    wokRestTime: "",
    wokEndTime: "",
    wokDeleteState: "N",
    wokColor: "",
    wokType: "",
  });
  const [insertPattern, setInsertPattern] = useState({
    wokStartTime: "",
    wokCode: 0,
    wokRestTime: "",
    wokEndTime: "",
    wokDeleteState: "N",
    wokColor: "",
    wokType: "",
  });

  useEffect(() => {
    dispatch(callSchedulePatternSearchAPI());
  }, [insertReducer, updateReducer, deleteReducer]);

  console.log("!!!!!!!!!!!!!!!!!!!!patternList", patternList);

  const onClickInsertPattern = () => {
    console.log("클릭");

    dispatch(
      callScheduleWorkPatternInsertAPI({
        pattern: insertPattern,
      })
    );

    setInsertPattern({
      wokCode: 0,
      wokStartTime: "",
      wokRestTime: "",
      wokEndTime: "",
      wokDeleteState: "N",
      wokColor: "",
      wokType: "",
    });
    setSendIndex(0);
    setSendWokCode(0);
    setUpdateState(false);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setPattern((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log("pattern", pattern);
  };

  const onChangeInsertHandler = (e) => {
    const { name, value } = e.target;
    setInsertPattern((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log("pattern", pattern);
  };

  useEffect(() => {
    if (updateState) {
      setPattern((prevForm) => ({
        ...prevForm,
        wokCode: patternList[sendIndex].wokCode,
        wokStartTime: patternList[sendIndex].wokStartTime,
        wokRestTime: patternList[sendIndex].wokRestTime,
        wokEndTime: patternList[sendIndex].wokEndTime,
        wokDeleteState: patternList[sendIndex].wokDeleteState,
        wokColor: patternList[sendIndex].wokColor,
        wokType: patternList[sendIndex].wokType,
      }));
    }
  }, [updateState]);

  const onChangeHandler2 = (e) => {
    const { name, value } = e.target;
    setPattern((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log("pattern", pattern);
  };

  const onClickCloseModal = () => {
    setPattern({
      wokCode: 0,
      wokStartTime: "",
      wokRestTime: "",
      wokEndTime: "",
      wokDeleteState: "N",
      wokColor: "",
      wokType: "",
    });
    setInsertPattern({
      wokCode: 0,
      wokStartTime: "",
      wokRestTime: "",
      wokEndTime: "",
      wokDeleteState: "N",
      wokColor: "",
      wokType: "",
    });
    setSendIndex(0);
    setSendWokCode(0);
    setUpdateState(false);
  };

  const onClickColorBox = (event, index) => {
    const selectedPattern = patternList[index];
    setPattern(selectedPattern);

    console.log("Selected Pattern:", selectedPattern);

    props.getSelectedPattern(selectedPattern);
  };

  const onClickDeletePattern = (index) => {
    console.log("index.........................", index);

    const sendWokCode = patternList[index].wokCode;

    dispatch(callScheduleWorkPatterDeleteAPI({ sendWokCode }));
  };

  const onClickSendIndex = (index) => {
    console.log("1111111111111111111", index);
    setPattern({
      wokCode: patternList[index].wokCode,
      wokStartTime: patternList[index].wokStartTime,
      wokRestTime: patternList[index].wokRestTime,
      wokEndTime: patternList[index].wokEndTime,
      wokDeleteState: patternList[index].wokDeleteState,
      wokColor: patternList[index].wokColor,
      wokType: patternList[index].wokType,
    });
  };

  const onClickUpdatePattern = () => {
    dispatch(callScheduleWorkPatternUpdateAPI({ pattern }));

    setPattern({
      wokCode: 0,
      wokStartTime: "",
      wokRestTime: "",
      wokEndTime: "",
      wokDeleteState: "N",
      wokColor: "",
      wokType: "",
    });
    setSendIndex(0);
    setSendWokCode(0);
    setUpdateState(false);
  };

  return (
    <div className={`${payCSS["contentLeft"]}`}>
      <div
        className={`${payCSS["newSchedule"]}`}
        data-bs-toggle="modal"
        data-bs-target="#newPatternGroup"
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
            <div
              className={`${payCSS["work"]}`}
              id="work"
              key={index}
              onClick={(event) => onClickColorBox(event, index)}
            >
              <div className={`${payCSS["content_left"]}`}>
                <div
                  className={`${payCSS["color_box"]}`}
                  style={{ backgroundColor: p.wokColor }}
                ></div>
              </div>
              <div className={`${payCSS["content_right"]}`}>
                <div className={`${payCSS["contentRightWrapper"]}`}>
                  <div className={`${payCSS["contentRightWrapper2"]}`}>
                    <div className={`${payCSS["schedule"]}`}>{p.wokType}</div>
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
                        <span
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#patternUpdate"
                          onClick={() => onClickSendIndex(index)}
                        >
                          수정
                        </span>
                        <span
                          className="dropdown-item"
                          onClick={() => onClickDeletePattern(index)}
                        >
                          삭제
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${payCSS["time"]}`}>
                    {formatTime(p.wokStartTime)} ~{formatTime(p.wokEndTime)}
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
      {/* patternInsert */}
      <div
        className="modal fade"
        id="newPatternGroup"
        tabIndex="-1"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                  onChange={onChangeInsertHandler}
                  value={insertPattern.wokColor}
                />
                <label className={`${payCSS["colorLabel"]}`}>
                  편성명
                  <input
                    type="text"
                    className={`${payCSS["patternName"]}`}
                    name="wokType"
                    onChange={onChangeInsertHandler}
                    value={insertPattern.wokType}
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
                    onChange={onChangeInsertHandler}
                    value={insertPattern.wokStartTime}
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
                    onChange={onChangeInsertHandler}
                    name="wokEndTime"
                    value={insertPattern.wokEndTime}
                  />
                </div>
                <div className={`${payCSS["modalMiddleWrapper"]}`}>
                  <div className={`${payCSS["modalMiddleText"]}`}>휴게시간</div>
                  <select
                    className={`${payCSS["timeSelect"]}`}
                    onChange={onChangeInsertHandler}
                    name="wokRestTime"
                    value={insertPattern.wokRestTime}
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
      {/* patternUpdate */}
      <div
        className="modal fade"
        id="patternUpdate"
        tabIndex="-1"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                  onChange={onChangeHandler2}
                  value={pattern.wokColor}
                />
                <label className={`${payCSS["colorLabel"]}`}>
                  편성명
                  <input
                    type="text"
                    className={`${payCSS["patternName"]}`}
                    name="wokType"
                    onChange={onChangeHandler2}
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
                    onChange={onChangeHandler2}
                    value={pattern.wokStartTime}
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
                    onChange={onChangeHandler2}
                    name="wokEndTime"
                    value={pattern.wokEndTime}
                  />
                </div>
                <div className={`${payCSS["modalMiddleWrapper"]}`}>
                  <div className={`${payCSS["modalMiddleText"]}`}>휴게시간</div>
                  <select
                    className={`${payCSS["timeSelect"]}`}
                    onChange={onChangeHandler2}
                    name="wokRestTime"
                    value={pattern.wokRestTime}
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
                  onClick={onClickUpdatePattern}
                >
                  수정
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
  );
};

export default SchedulePattenAddPattern;
