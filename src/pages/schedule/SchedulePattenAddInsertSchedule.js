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
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";

const SchedulePattenAddInsertSchedule = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const allList = useSelector((state) => state.scheduleReducer);
  const patternList = useSelector((state) => state.schedulePatternReducer);
  const [insertRows, setInsertRows] = useState([]);
  const departmentList = useSelector((state) => state.organizationChartReducer);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const depList = departmentList.children;

  const onClickColorBox = (event) => {
    const backgroundColor = event.target.style.backgroundColor;
    setSelectedColor(backgroundColor);
    if (selectedDayIndex !== null) {
      const selectedDay = document.getElementsByClassName(payCSS["monToSun"])[
        selectedDayIndex
      ];
      selectedDay.style.background = backgroundColor;
      console.log(backgroundColor);
    }
  };

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
      schType: "",
      schStartDate: "",
      schEndDate: "",
      schColor: "N",
      schDeleteStatus: "",
      wokCode: "",
      dayCode: "",
    },
  ]);

  useImperativeHandle(ref, () => ({
    handleAddRow: () => {
      setInsertRows((prevRows) => [...prevRows, {}]);
      setScheduleForm([
        {
          schCode: "",
          schType: "",
          schStartDate: "",
          schEndDate: "",
          schColor: "N",
          schDeleteStatus: "",
          wokCode: "",
          dayCode: "",
        },
      ]);
    },
  }));

  const insertSchedule = (e, index) => {
    const { name, value } = e.target;

    setScheduleForm((prevScheduleForm) => {
      return prevScheduleForm.map((form, idx) => {
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

  const onClicktree = (name) => {
    console.log(name, "클릭");
  };

  useEffect(() => {
    dispatch(callOrganizationTreeAPI());
  }, []);

  console.log(departmentList);
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
  console.log("setChecked +++++++++++++++++++++", checked);

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
                />
                <input
                  type="Date"
                  className={`${payCSS["period"]}`}
                  name="schEndDate"
                  onChange={(e) => insertSchedule(e, index)}
                />
              </div>
              <button className={`${payCSS["check"]}`}>
                <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                <div className={`${payCSS["commit"]}`} style={{ marginTop: 3 }}>
                  &nbsp; 적용
                </div>
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
            <div>
              <button
                className={`${payCSS["plus-icon"]}`}
                data-bs-toggle="modal"
                data-bs-target="#modalCenter2"
              >
                <i
                  className={"bx bx-plus"}
                  style={{ fontSize: "1.5rem", color: "#fff" }}
                />
              </button>
            </div>
            <div className={`${payCSS["wrapperName"]}`}>
              {checked.map((memName, idx) => {
                // memName에 '/'가 포함되어 있는지 확인합니다.
                const indexOfSlash = memName.indexOf("/");
                // '/'가 포함되어 있으면 분할하여 뒷 부분을 가져오고, 없으면 null을 반환합니다.
                const extractedName =
                  indexOfSlash !== -1 ? memName.split("/")[1] : null;
                // extractedName이 null이 아닌 경우에만 해당 문자열을 출력합니다.
                if (extractedName !== null) {
                  return (
                    <div className={`${payCSS["name"]}`} key={idx}>
                      <span>{extractedName}</span>
                    </div>
                  );
                }
                // '/'가 포함되지 않은 경우는 아무 작업도 수행하지 않습니다.
                return null;
              })}
            </div>
          </div>
        </div>
      ))}
      <div
        className="modal fade"
        id="modalCenter2"
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
