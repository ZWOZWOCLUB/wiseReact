import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forwardRef, useImperativeHandle } from "react";
import "../../assets/vendor/libs/jquery/jquery.js";
import "../../assets/vendor/libs/popper/popper.js";
import "../../assets/vendor/js/bootstrap.js";
import "../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";
import "../../assets/vendor/js/menu.js";
import "../../assets/js/config.js";
import coreCSS from "../../@core/vendor/css/core.module.css";
import payCSS from "../../@core/css/make_schedule.module.css";
import { callOrganizationTreeAPI } from "../../apis/OrganizationChartAPICalls";
import { callScheduleInsertAPI } from "../../apis/ScheduleInsertAPICalls.js";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";

const SchedulePattenAddInsertSchedule = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.schedulePatternReducer);
  const [insertRows, setInsertRows] = useState([]);
  const departmentList = useSelector((state) => state.organizationChartReducer);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState(["동물원병원"]);
  const selectedColor = props.selectedColor;
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedDayIndices, setSelectedDayIndices] = useState(
    Array(7).fill(false)
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState("");
  const scheduleRef = useRef();
  const [checkedList, setCheckedList] = useState([]);
  const result2 = useSelector((state) => state.scheduleInsertReducer);



  useImperativeHandle(ref, () => ({
    onClickMonToSun: (index, dayIndex) => {
      setSelectedIndices((prevIndices) => [...prevIndices, index]);
      setSelectedDayIndices((prevDayIndices) => {
        const newDayIndices = [...prevDayIndices];
        newDayIndices[dayIndex] = index;
        return newDayIndices;
      });
    },
  }));

  const onClickMonToSun = (index, dayIndex) => {
    setSelectedRowIndex(index);

    setSelectedDayIndices((prevState) => {
      const newSelectedDayIndices = [...prevState];
      newSelectedDayIndices[dayIndex] = !prevState[dayIndex];
      return newSelectedDayIndices;
    });
  };

  const getDayStyle = (dayIndex) => {
    if (selectedDayIndices[dayIndex]) {
      return { background: selectedColor ? selectedColor.wokColor : "" };
    }
    return {};
  };

  const getType = (dayIndex) => {
    if (selectedDayIndices[dayIndex]) {
      return selectedColor ? selectedColor.wokType : "";
    }
    return "";
  };

  const getTime = (dayIndex) => {
    if (selectedDayIndices[dayIndex]) {
      return selectedColor
        ? selectedColor.wokStartTime.slice(0, -3) +
            " ~ " +
            selectedColor.wokEndTime.slice(0, -3)
        : "";
    }

    return "";
  };

  const [scheduleForm, setScheduleForm] = useState({
    schType: "",
    schStartDate: "",
    schEndDate: "",
    schColor: "",
    schDeleteStatus: "N",
    dayCode: "",
    wokCode: selectedColor ? selectedColor.wokCode : "",
    memCode: checked
      .filter((memName) => memName.includes("/"))
      .map((memName) => memName.split("/")[0]),
  });

  useEffect(()=>{
    setInsertRows([])
  setScheduleForm([{
    schType: "",
    schStartDate: "",
    schEndDate: "",
    schColor: "",
    schDeleteStatus: "N",
    dayCode: "",
    wokCode: selectedColor ? selectedColor.wokCode : "",
    memCode: checked
      .filter((memName) => memName.includes("/"))
      .map((memName) => memName.split("/")[0])}
  ])}, [allList, result2]);
  useImperativeHandle(ref, () => ({
    handleAddRow: () => {
      if (insertRows.length === 0) {
        setInsertRows((prevRows) => [...prevRows, {}]);
      } else {
        alert("추가된 그룹 먼저 등록 후 진행해주세요");
      }
    },
  }));

  const insertSchedule = (e, index) => {
    const { name, value } = e.target;
    setScheduleForm((prevScheduleForm) => ({
      ...prevScheduleForm,
      [name]: value,

      memCode: checked
        .filter((memName) => memName.includes("/"))
        .map((memName) => memName.split("/")[0]),
    }));
    if (selectedColor) {
      setScheduleForm((prevScheduleForm) => ({
        ...prevScheduleForm,
        schColor: selectedColor.wokColor,
        wokCode: selectedColor.wokCode,
        dayCode: selectedDayIndices
          .map((isSelected, index) => (isSelected ? index : null))
          .filter((index) => index !== null),
      }));
    }
  };

  useEffect(() => {
    if (selectedColor) {
      setScheduleForm((prevScheduleForm) => ({
        ...prevScheduleForm,
        wokCode: selectedColor.wokCode,
        schColor: selectedColor.wokColor,
        dayCode: selectedDayIndices
          .map((isSelected, index) => (isSelected ? index : null))
          .filter((index) => index !== null),
        memCode: checked
          .filter((memName) => memName.includes("/"))
          .map((memName) => memName.split("/")[0]),
      }));
    }
  }, [selectedColor, selectedDayIndices, checked]);

  useEffect(() => {
    dispatch(callOrganizationTreeAPI());
  }, []);

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
                      value: mem.memCode + "/" + mem.memName,
                      label: mem.memName + " " + mem.posName,
                    }))
                  : dep.children.map((chi) => ({
                      value: chi.depCode,
                      label: chi.depName,
                      children: chi.memberList.map((mem) => ({
                        value: mem.memCode + "/" + mem.memName,
                        label: mem.memName + " " + mem.posName,
                      })),
                    })),
            })),
          },
        ]
      : [];

  const onClickGetMemCode = (e) => {
    console.log(e.value);
  };

  const onClickScheduleInsert = () => {
    const formData = new FormData();
    formData.append("wokCode", scheduleForm.wokCode);
    formData.append("schType", scheduleForm.schType);
    formData.append("schStartDate", scheduleForm.schStartDate);
    formData.append("schEndDate", scheduleForm.schEndDate);
    formData.append("schColor", scheduleForm.schColor);
    formData.append("schDeleteStatus", "N");
    formData.append("dayCode", scheduleForm.dayCode);
    formData.append(
      "memCode",
      checked
        .map((memName, idx) => {
          const indexOfSlash = memName.indexOf("/");
          const extractedName =
            indexOfSlash !== -1 ? memName.split("/")[0] : memName;
          return extractedName;
        })
        .filter((extractedName) => extractedName !== "")
    );
    dispatch(
      callScheduleInsertAPI({
        scheduleForm: formData,
      })
    );
    

  };

  const onClickIndex = (index) => {
    console.log("ddddddddddddd", index);
  };
  console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^", scheduleForm);

  return (
    <>
      {insertRows.map((row, index) => (
        <div id={`${payCSS["borderCardWrapper"]}`} key={index}>
          <div className={`${payCSS["top"]}`}>
            <div className={`${payCSS["top_left"]}`}>
              <div className={`${payCSS["nickname"]}`}>
                <input
                  type="text"
                  className={`${payCSS["nickname2"]}`}
                  name="schType"
                  onChange={(e) => insertSchedule(e, index)}
                />
              </div>
            </div>
            <div className={`${payCSS["top_right"]}`}>
              <div className={`${payCSS["schedule_date"]}`}>
                <input
                  type="Date"
                  className={`${payCSS["period"]}`}
                  name="schStartDate"
                  onChange={(e) => insertSchedule(e, index)}
                />{" "}
                &nbsp; ~
                <input
                  type="Date"
                  className={`${payCSS["period"]}`}
                  name="schEndDate"
                  onChange={(e) => insertSchedule(e, index)}
                />
              </div>
              <button
                className={`${payCSS["check"]}`}
                style={{ background: "#696CFF", color: "white", width: "30%" }}
                onClick={onClickScheduleInsert}
              >
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
            {["월", "화", "수", "목", "금", "토", "일"].map((dayIndex, idx) => (
              <div
                key={idx}
                className={`${payCSS["monToSun"]}`}
                onClick={() => {
                  onClickMonToSun(index, idx);
                }}
                style={getDayStyle(idx)}
              >
                <div className={`${payCSS["forColor"]}`}>
                  <div className={`${payCSS["first"]}`}>
                    <strong>{dayIndex}</strong>
                  </div>
                  <div className={`${payCSS["second"]}`}>{getType(idx)}</div>
                  <div className={`${payCSS["third"]}`}>
                    <small>{getTime(idx)}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={`${payCSS["bottom"]}`}>
            <div>
              <button
                className={`${payCSS["plus-icon"]}`}
                data-bs-toggle="modal"
                data-bs-target="#modalCenterScheduleInsert"
                onClick={() => onClickIndex(index)}
              >
                <i
                  className={"bx bx-plus"}
                  style={{ fontSize: "1.5rem", color: "#fff" }}
                />
              </button>
            </div>
            <div className={`${payCSS["wrapperName"]}`}>
              {checked.map((memName, idx) => {
                const indexOfSlash = memName.indexOf("/");
                const extractedName =
                  indexOfSlash !== -1 ? memName.split("/")[1] : null;
                if (extractedName !== null) {
                  return (
                    <div className={`${payCSS["name"]}`} key={idx}>
                      <span>{extractedName}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      ))}
      <div
        className="modal fade"
        id="modalCenterScheduleInsert"
        tabIndex="-1"
        aria-hidden="true"
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
              <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => setChecked(checked)}
                onExpand={(expanded) => setExpanded(expanded)}
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
              />
              <hr />
              <div className={`${payCSS["modalBtnWrapper"]}`}>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  style={{ marginRight: "1rem" }}
                >
                  선택
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default SchedulePattenAddInsertSchedule;
