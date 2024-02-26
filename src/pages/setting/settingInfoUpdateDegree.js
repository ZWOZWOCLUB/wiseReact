import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callDegreeDeleteAPI } from "../../apis/SettingDegreeAPICalls";

function SettingInfoDegree({ onUpdate }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const [updateDegState, setUpdateDegState] = useState(false);

  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const result = useSelector((state) => state.settingDegreeInsertReducer);
  const result2 = useSelector((state) => state.settingDegreeUpdateReducer);
  const result3 = useSelector((state) => state.settingDegreeDeleteReducer);

  useEffect(() => {}, [result, result2, result3]);

  const [degForm, setDegForm] = useState([
    {
      memCode: memberCode,
      degCode: "",
      degKind: "",
      degMajor: "",
      degName: "",
      degGraduation: "",
      degState: "",
      degAdmissions: "",
    },
  ]);

  useEffect(() => {
    if (Array.isArray(prevList.degreeDTO)) {
      setDegForm((prevForms) => {
        return prevList.degreeDTO.map((deg) => ({
          memCode: memberCode,
          degCode: deg.degCode,
          degKind: deg.degKind,
          degMajor: deg.degMajor,
          degName: deg.degName,
          degGraduation: deg.degGraduation,
          degState: deg.degState,
          degAdmissions: deg.degAdmissions,
        }));
      });
    }
  }, [prevList]);

  const onChangeDegHandler = (e, index) => {
    setUpdateDegState(true);

    const { name, value } = e.target;

    setDegForm((prevForms) => {
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

  const handleRemoveRow = (index) => {
    const degCode = prevList.degreeDTO[index].degCode;
    const findMatchCode = prevList.degreeFileDTO.some(
      (file) => file.degCode === degCode
    );

    if (findMatchCode) {
      alert(
        "학위 증명 파일이 등록되어 있어 삭제 불가능합니다. \n 파일 먼저 삭제해 주세요"
      );
    } else {
      dispatch(callDegreeDeleteAPI({ degCode }));
    }
  };

  useEffect(() => {
    onUpdate(degForm);
  }, [degForm, onUpdate]);

  return (
    <>
      <div>
        <div
          style={{
            color: "#696cff",
            fontWeight: "bold",
            fontSize: "large",
          }}
        >
          학위
          <br />
        </div>
        <div
          className="d-flex align-items-start align-items-sm-center gap-4"
          id="groupList3"
        >
          <div className="labelWrapper">
            <div className="form-label" style={{ width: "20%" }}>
              입학일
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              졸업(예정)일
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              학교(교육)명
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              학과
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              학위
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              상태
            </div>
            <div className="form-label" style={{ width: "5%" }} />
          </div>
        </div>
        {Array.isArray(prevList.degreeDTO) && prevList.degreeDTO.length > 0
          ? prevList.degreeDTO.map((deg, index) => (
              <div className="input-group3" key={index}>
                <input type="hidden" value={deg.degCode}></input>
                <div className="inputWrapper">
                  <input
                    className="form-control3"
                    type="date"
                    style={{
                      borderTopLeftRadius: "0.375rem",
                      borderBottomLeftRadius: "0.375rem",
                    }}
                    onChange={(e) => onChangeDegHandler(e, index)}
                    name="degAdmissions"
                    value={
                      !updateDegState
                        ? deg.degAdmissions
                        : degForm.degAdmissions
                    }
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    className="form-control3"
                    type="date"
                    onChange={(e) => onChangeDegHandler(e, index)}
                    value={
                      !updateDegState
                        ? deg.degGraduation
                        : degForm.degGraduation
                    }
                    name="degGraduation"
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="form-control3"
                    aria-describedby="basic-addon11"
                    onChange={(e) => onChangeDegHandler(e, index)}
                    value={!updateDegState ? deg.degName : degForm.degName}
                    name="degName"
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="form-control3"
                    onChange={(e) => onChangeDegHandler(e, index)}
                    aria-describedby="basic-addon11"
                    value={!updateDegState ? deg.degMajor : degForm.degMajor}
                    name="degMajor"
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="form-control3"
                    aria-describedby="basic-addon11"
                    onChange={(e) => onChangeDegHandler(e, index)}
                    value={!updateDegState ? deg.degKind : degForm.degKind}
                    name="degKind"
                  />
                </div>
                <div className="inputWrapper">
                  <select
                    name="degState"
                    className="form-select1"
                    onChange={(e) => onChangeDegHandler(e, index)}
                    value={!updateDegState ? deg.degState : degForm.degState}
                  >
                    <option value={0}>선택</option>
                    <option value="졸업">졸업</option>
                    <option value="수료">수료</option>
                    <option value="재학">재학</option>
                    <option value="휴학">휴학</option>
                    <option value="중퇴">중퇴</option>
                  </select>
                </div>
                <div>
                  <div
                    className="form-control3"
                    style={{
                      borderTopRightRadius: "0.375rem",
                      borderBottomRightRadius: "0.375rem",
                    }}
                  >
                    <button
                      className="bx bx-x"
                      onClick={() => handleRemoveRow(index)}
                      style={{
                        border: 0,
                        backgroundColor: "rgba(0, 0, 0, 0)",
                      }}
                    ></button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default SettingInfoDegree;
