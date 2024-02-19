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
import SchedulePattenAddPattern from "./SchedulePattenAddPattern.js";
import SchedulePattenAddSchedule from "./SchedulePattenAddSchedule.js";
import SchedulePattenAddInsertSchedule from "./SchedulePattenAddInsertSchedule.js";

function SchedulePattenAdd() {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.schedulePatternReducer);
  const [insertRows, serInsertRows] = useState([]);
  const handleAddRowButtonClick = () => {
    scheduleRef.current.handleAddRow();
  };

  const scheduleRef = useRef();

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

  useEffect(() => {
    dispatch(callSchedulePatternAndDaySearchAPI());
  }, []);
  console.log("!!!!!!!!!!!!!!!!!!!!allList", allList);

  useEffect(() => {
    dispatch(callSchedulePatternSearchAPI());
  }, [insertReducer, updateReducer, deleteReducer]);

  console.log("!!!!!!!!!!!!!!!!!!!!patternList", patternList);

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
    scheduleRef.current.handleAddRow();
  };

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
          <div className={`${payCSS["new_group"]} `} onClick={handleAddRow}>
            + 새 근무 그룹
          </div>
          <div className={`${payCSS["bx"]} ${payCSS["bx-x"]}`} id="close"></div>
        </div>
      </div>
      <div className={`${payCSS["schedule_content"]}`}>
        <div className={`${payCSS["side_schedule"]}`} id="side_schedule">
          <SchedulePattenAddPattern />
        </div>
        <div className={`${payCSS["main_content"]}`}>
          <div className={`${payCSS["border_card"]}`}>
            <SchedulePattenAddInsertSchedule ref={scheduleRef} />
            <SchedulePattenAddSchedule />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulePattenAdd;
