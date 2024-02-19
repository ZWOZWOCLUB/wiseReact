import { useEffect, useState,  useRef } from "react";
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
  const selectedColor = props.selectedColor;
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedDayIndices, setSelectedDayIndices] = useState(Array(7).fill(null));
  const [selectedRowIndex, setSelectedRowIndex] = useState('')
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [sendColor, setSendColor] = useState("");

  const scheduleRef = useRef();
  useEffect(() => {
    console.log("Selected Color in Insert Schedule:", selectedColor);
  }, [selectedColor]);

  
  console.log("$$$$$$$$$$$$$$$sendColor", selectedColor);
  
  useImperativeHandle(ref, () => ({
    onClickMonToSun: (index, dayIndex) => {
      setSelectedIndices(prevIndices => [...prevIndices, index]);
      setSelectedDayIndices(prevDayIndices => {
        const newDayIndices = [...prevDayIndices];
        newDayIndices[dayIndex] = index;
        return newDayIndices;
      });
    }
  }));

  const onClickMonToSun = (index, dayIndex) => {
    setSelectedIndices(prevIndices => {
      // 이미 선택된 요일이 있는지 확인
      const isIndexSelected = prevIndices.includes(index);
  
      if (!isIndexSelected) {
        // 선택되지 않은 경우, 인덱스를 추가
        return [...prevIndices, index];
      } else {
        // 이미 선택된 경우, 해당 인덱스를 제거
        return prevIndices.filter(idx => idx !== index);
      }
    });
  
    setSelectedDayIndices(prevDayIndices => {
      const newDayIndices = [...prevDayIndices];
  
      // 선택된 요일에 대해서만 작업을 수행
      if (!prevDayIndices[dayIndex] && prevDayIndices[dayIndex] !== 0) {
        newDayIndices[dayIndex] = index; // 선택된 요일에 인덱스 할당
      } else {
        // 이미 선택된 경우, 해당 요일의 배경색을 없애고 인덱스를 제거
        newDayIndices[dayIndex] = null;
      }
  
      return newDayIndices;
    });
  };
  
  
  
  
  console.log('selcsdfsdf', selectedIndices)
  console.log('setSelectedDayIndices', selectedDayIndices)
  

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
      if (insertRows.length === 0) {

      setInsertRows((prevRows) => [...prevRows, {}]);
      setScheduleForm((prevScheduleForm) => [
        ...prevScheduleForm,
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
    }else{
      alert('추가된 그룹 먼저 등록 후 진행해주세요')
    }}
  }));
  
  console.log('//////////////', insertRows.length)
  

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

  const onClickIndex = (index) => {
    console.log('ddddddddddddd',index);

  }
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
                /> &nbsp; ~
                <input
                  type="Date"
                  className={`${payCSS["period"]}`}
                  name="schEndDate"
                  onChange={(e) => insertSchedule(e, index)}
                />
              </div>
              <button className={`${payCSS["check"]}`}>
                <i className={"bx bx-check"} style={{ marginRight: 1 }} />
                <div style={{ marginTop: 3 }}>
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
          {['월', '화', '수', '목', '금', '토', '일'].map((dayIndex, idx) => (
        <div
          key={idx}
          className={`${payCSS["monToSun"]}`}
          onClick={() => {
            onClickMonToSun(index, idx ); 
          }}
          style={{ background: selectedDayIndices[idx] !== null && selectedIndices.includes(index) ? selectedColor : 'transparent' }}

        >
                        <div className={`${payCSS["forColor"]}`} >
                <div className={`${payCSS["first"]}`}>
                  <strong>{dayIndex}</strong>
                </div>
                <div className={`${payCSS["second"]}`}>데이</div>
                <div className={`${payCSS["third"]}`}>
                  <small>07:00-15:00</small>
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
                data-bs-target="#modalCenter2"
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
