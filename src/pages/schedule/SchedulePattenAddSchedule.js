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
import { callSchedulePatternAndDaySearchAPI } from "../../apis/SchedulePatternDayAPICalls.js";
import { callSchaduleTreeAPI } from "../../apis/ScheduleAPICalls.js";
import { callScheduleUpdateAPI } from "../../apis/ScheduleUpdateAPICalls.js";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree2 from "react-checkbox-tree";

const SchedulePattenAddSchedule = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.schedulePatternDayReducer);
  const department = useSelector((state) => state.scheduleTreeReducer);
  const result = useSelector((state) => state.scheduleUpdateReducer);

  const [checkeds, setCheckeds] = useState([]);
  const [expanded, setExpanded] = useState(["동물원병원"]);
  const selectedColor = props.selectedColor;
  const [modalIndex, setModalIndex] = useState(null);
  const [memCode, setMemCode] = useState([]);
  const [updateState, setUpdateState] = useState([]);
  const [updateSelectedDayIndices, setUpdateSelectedDayIndices] = useState([]);
  const result2 = useSelector((state) => state.scheduleInsertReducer);
  useEffect(() => {
    dispatch(callSchaduleTreeAPI());
  }, []);

  useEffect(() => {
    console.log("selectedColor", selectedColor);
  }, [selectedColor]);

  useImperativeHandle(ref, () => ({
    onClickMonToSun: (index, dayIndex) => {
      setUpdateSelectedDayIndices((prevDayIndices) => {
        const newDayIndices = [...prevDayIndices];
        newDayIndices[dayIndex] = index;
        return newDayIndices;
      });
    },
  }));

  const onClickMonToSun = (index, dayIndex) => {
    if (updateState.includes(index)) {
      setUpdateSelectedDayIndices([index][Array(7).fill(false)]);
      if (!updateSelectedDayIndices[index]) {
        const newDayIndices = Array(7).fill(false);
        const updatedDayIndices = [...updateSelectedDayIndices];
        updatedDayIndices[index] = newDayIndices;
        updatedDayIndices[index][dayIndex] = !newDayIndices[dayIndex];
        setUpdateSelectedDayIndices(updatedDayIndices);
      } else {
        const updatedDayIndices = [...updateSelectedDayIndices];
        updatedDayIndices[index][dayIndex] =
          !updatedDayIndices[index][dayIndex];
        setUpdateSelectedDayIndices(updatedDayIndices);
      }
      scheduleForm[index].patternList = selectedColor;
      scheduleForm[index].etcPatternList = updateSelectedDayIndices[index]
        ? updateSelectedDayIndices[index]
            .map((isSelected, index) => (isSelected ? index : null))
            .filter((index) => index !== null)
        : "";
    }
  };

  console.log(
    "$$$$$$$$$$$$$$$updateSelectedDayIndices",
    updateSelectedDayIndices
  );

  const getDayStyle = (index, idx) => {
    if (
      updateSelectedDayIndices[index] &&
      Array.isArray(updateSelectedDayIndices[index])
    ) {
      if (updateSelectedDayIndices[index][idx]) {
        return { background: selectedColor ? selectedColor.wokColor : "" };
      }
    } else if (
      allList[index].patternDayList.some(
        (day) => day.patternDayID.dayCode === idx + 1
      )
    ) {
      return { background: allList[index].patternList.wokColor };
    }
  };

  const getType = (index, idx) => {
    if (
      updateSelectedDayIndices[index] &&
      Array.isArray(updateSelectedDayIndices[index])
    ) {
      if (updateSelectedDayIndices[index][idx]) {
        return selectedColor ? selectedColor.wokType : "-";
      }
    } else if (
      allList[index].patternDayList.some(
        (day) => day.patternDayID.dayCode === idx + 1
      )
    ) {
      return allList[index].patternList.wokType;
    }
  };

  const getTime = (index, idx) => {
    if (
      updateSelectedDayIndices[index] &&
      Array.isArray(updateSelectedDayIndices[index])
    ) {
      if (updateSelectedDayIndices[index][idx]) {
        return selectedColor
          ? selectedColor.wokStartTime.slice(0, -3) +
              " ~ " +
              selectedColor.wokEndTime.slice(0, -3)
          : "-";
      }
    } else if (
      allList[index].patternDayList.some(
        (day) => day.patternDayID.dayCode === idx + 1
      )
    ) {
      return (
        allList[index].patternList.wokStartTime.slice(0, -3) +
        " ~ " +
        allList[index].patternList.wokEndTime.slice(0, -3)
      );
    }
  };

  useEffect(() => {
    dispatch(callSchedulePatternAndDaySearchAPI());
  }, [result, result2]);
  console.log("!!!!!!!!!!!!!!!!!!!!allList", allList);

  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const [scheduleForm, setScheduleForm] = useState([]);
  const changeState = (index) => {
    if (scheduleForm.length === 0) {
      if (Array.isArray(allList)) {
        const selectedSchedule = allList[index];
        const updatedForm = [...scheduleForm];
        updatedForm[index] = selectedSchedule;
        setScheduleForm(updatedForm);
        const updatedUpdateState = [...updateState, index];
        setUpdateState(updatedUpdateState);
      }
    } else {
      alert("수정 중인 스케줄의 변경을 먼저 완료해주세요.");
    }
  };

  console.log("updateState", updateState);

  const onChangeHandler = (e, index) => {
    const { name, value } = e.target;

    setScheduleForm((prevForms) => {
      return prevForms.map((form, idx) => {
        if (idx === index) {
          return {
            ...form,
            [name]: value,
          };
        }
        return form;
      });
    });
  };
  console.log("scheduleForm+++++++++++++++++++++++", scheduleForm);

  const nodes =
    department && department.children
      ? [
          {
            value: department.depName,
            label: department.depName,
            expandDisabled: true,
            children: department.children.map((dep) => ({
              value: dep.depName === "인사팀" ? dep.depName : dep.depName,
              label: dep.depName === "인사팀" ? dep.depName : dep.depName,
              children:
                dep.depName === "인사팀"
                  ? dep.memberList.map((mem) => ({
                      value: mem.memCode + "/" + mem.memName,
                      label: mem.memName + " " + mem.posName,
                    }))
                  : dep.children.map((chi) => ({
                      value: chi.depName,
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

  console.log("setChecked +++++++++++++++++++++", checkeds);
  console.log("department +++++++++++++++++++++", department);

  const onClickIndex = (index) => {
    console.log("ddddddddddddd", index);
    setModalIndex(index);
  };

  useEffect(() => {
    if (modalIndex !== null && checkeds.length > 0) {
      setScheduleForm((prevScheduleForm) => {
        const updatedScheduleForm = [...prevScheduleForm];
        updatedScheduleForm[modalIndex].memberList = checkeds
          .filter((memName) => memName.includes("/"))
          .map((memName) => memName.split("/")[0]);
        updatedScheduleForm[modalIndex].allowanceList = checkeds
          .filter((memName) => memName.includes("/"))
          .map((memName) => memName.split("/")[1]);
        return updatedScheduleForm;
      });
    }
  }, [modalIndex, checkeds]);

  const onCancel = (index) => {
    setUpdateSelectedDayIndices((prevIndices) => {
      const newIndices = [...prevIndices];
      newIndices.splice(index, 1);

      return newIndices;
    });
    console.log("ddddddddddddd", updateSelectedDayIndices);

    setUpdateState((prevUpdateState) => {
      const newUpdateState = prevUpdateState.filter((item) => item !== index);
      return newUpdateState;
    });

    setScheduleForm((prevScheduleForm) => {
      const newScheduleForm = [...prevScheduleForm];
      newScheduleForm.splice(index, 1);
      return newScheduleForm;
    });
    console.log("ddddddddddddd", scheduleForm);
  };
  const onClick = () => {
    setCheckeds([]);
  };
  const updateSchedule = (index) => {
    const formData = new FormData();
    formData.append("wokCode", scheduleForm[index].patternList.wokCode);
    formData.append("schCode", scheduleForm[index].schCode);
    formData.append("schType", scheduleForm[index].schType);
    formData.append("schStartDate", scheduleForm[index].schStartDate);
    formData.append("schEndDate", scheduleForm[index].schEndDate);
    formData.append("schDeleteStatus", scheduleForm[index].schDeleteStatus);
    formData.append("schColor", scheduleForm[index].patternList.wokColor);
    formData.append(
      "dayCode",
      scheduleForm[index].etcPatternList
        ? scheduleForm[index].etcPatternList
        : ""
    );
    formData.append(
      "memCode",
      scheduleForm[index].memberList ? scheduleForm[index].memberList : ""
    );
    scheduleForm[index].patternDayList.forEach((day, idx) => {
      formData.append(`prevDayCode[${idx}]`, day.patternDayID.dayCode);
    });
    scheduleForm[index].patternDayList.forEach((day, idx) => {
      formData.append(`prevWokCode[${idx}]`, day.patternDayID.wokCode);
    });

    console.log("formData@@@@@@@@@@@@@@@@@@@@@", formData);
    dispatch(callScheduleUpdateAPI({ form: formData }));

    setUpdateState([]);
    setScheduleForm([]);
  };

  const deleteSchedule = (index) => {
    console.log("formDatadeleteSchedule", deleteSchedule);

    const formData = new FormData();
    formData.append("schDeleteStatus", "Y");
    formData.append("schCode", allList[index].schCode);

    dispatch(callScheduleUpdateAPI({ form: formData }));
  };
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
                      value={
                        updateState.includes(index) && scheduleForm[index]
                          ? scheduleForm[index].schType
                          : p.schType
                      }
                      disabled={updateState.includes(index) ? false : true}
                      onChange={(e) => onChangeHandler(e, index)}
                      name="schType"
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
                      onChange={(e) => onChangeHandler(e, index)}
                      name="schStartDate"
                      value={
                        updateState.includes(index) && scheduleForm[index]
                          ? scheduleForm[index].schStartDate
                          : p.schStartDate
                      }
                      disabled={updateState.includes(index) ? false : true}
                    />
                    <input
                      type="Date"
                      className={`${payCSS["period"]}`}
                      onChange={(e) => onChangeHandler(e, index)}
                      name="schEndDate"
                      value={
                        updateState.includes(index) && scheduleForm[index]
                          ? scheduleForm[index].schEndDate
                          : p.schEndDate
                      }
                      disabled={updateState.includes(index) ? false : true}
                    />
                  </div>
                  {updateState.includes(index) ? (
                    <button
                      className={`${payCSS["check"]}`}
                      style={{ background: "#696CFF", color: "white" }}
                      onClick={() => updateSchedule(index)}
                    >
                      <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                      <div style={{ marginTop: 3, color: "white" }}>
                        &nbsp; 적용
                      </div>
                    </button>
                  ) : (
                    <button
                      className={`${payCSS["check"]}`}
                      style={{ background: "#696CFF", color: "white" }}
                      onClick={() => changeState(index)}
                    >
                      <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                      <div style={{ marginTop: 3, color: "white" }}>
                        &nbsp; 수정
                      </div>
                    </button>
                  )}
                  {updateState.includes(index) ? (
                    <button
                      className={`${payCSS["check"]}`}
                      style={{ background: "#EB5757", color: "white" }}
                      onClick={() => onCancel(index)}
                    >
                      <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                      <div style={{ marginTop: 3, color: "white" }}>
                        &nbsp; 취소
                      </div>
                    </button>
                  ) : (
                    <button
                      className={`${payCSS["check"]}`}
                      style={{ background: "#EB5757", color: "white" }}
                      onClick={() => deleteSchedule(index)}
                    >
                      <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                      <div style={{ marginTop: 3, color: "white" }}>
                        &nbsp; 삭제
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div className={`${payCSS["middle"]}`}>
                {["월", "화", "수", "목", "금", "토", "일"].map(
                  (dayIndex, idx) => (
                    <div
                      key={idx}
                      className={`${payCSS["monToSun"]}`}
                      onClick={() => {
                        onClickMonToSun(index, idx);
                      }}
                      style={getDayStyle(index, idx)}
                    >
                      <div className={`${payCSS["forColor"]}`}>
                        <div className={`${payCSS["first"]}`}>
                          <strong>{dayIndex}</strong>
                        </div>
                        <div className={`${payCSS["second"]}`}>
                          {getType(index, idx)}
                        </div>

                        <div className={`${payCSS["third"]}`}>
                          <small>{getTime(index, idx)}</small>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className={`${payCSS["bottom"]}`}>
                <button
                  className={`${payCSS["plus-icon"]}`}
                  data-bs-toggle="modal"
                  data-bs-target={`#modalCenterScheduleUpdate${index}`}
                  onClick={() => onClickIndex(index)}
                  disabled={updateState.includes(index) ? false : true}
                  style={{
                    background: updateState.includes(index) ? "" : "#e5e5e5",
                  }}
                >
                  {" "}
                  <i
                    className={"bx bx-plus"}
                    style={{ fontSize: "1.5rem", color: "#fff" }}
                  />
                </button>
                <div className={`${payCSS["wrapperName"]}`}>
                  {updateState.includes(index) &&
                  scheduleForm[index].memberList &&
                  checkeds
                    ? scheduleForm[index].allowanceList.map((s, idx) => {
                        return (
                          <div className={`${payCSS["name"]}`} key={idx}>
                            <span>{s}</span>
                          </div>
                        );
                      })
                    : p.allowanceList.map((allowance, idx) => (
                        <div className={`${payCSS["name"]}`}>
                          <span key={idx}>
                            {allowance.memberList &&
                            allowance.memberList.memName
                              ? allowance.memberList.memName
                              : ""}
                          </span>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          ))
        : ""}
      {Array.isArray(allList) && allList.length > 0
        ? allList.map((p, index) => (
            <div
              className="modal fade"
              id={`modalCenterScheduleUpdate${index}`}
              tabIndex="-1"
              aria-hidden="true"
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
                    <CheckboxTree2
                      showExpandAll={true}
                      showNodeTitle={true}
                      nodes={nodes}
                      checked={checkeds}
                      expanded={expanded}
                      onExpand={(expanded) => setExpanded(expanded)}
                      onCheck={(checked) => setCheckeds(checked)}
                      icons={{
                        check: <span className="bx bx-checkbox-checked" />,
                        uncheck: <span className="bx bx-checkbox" />,
                        halfCheck: <span className="bx bx-checkbox-square" />,
                        expandClose: <span className="bx bx-chevron-right" />,
                        expandOpen: <span className="bx bx-chevron-down" />,
                        expandAll: <span className="bx bx-plus" />,
                        collapseAll: <span className="bx bx-minus" />,
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
                        onClick={onClick}
                      >
                        선택
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-dismiss="modal"
                        onClick={onClick}
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
});
export default SchedulePattenAddSchedule;
