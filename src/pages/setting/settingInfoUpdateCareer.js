import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callCareerDeleteAPI } from "../../apis/SettingCareerAPICalls";

function SettingInfoCareer({ onUpdate }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const [updateCrrState, setUpdateCrrState] = useState(false);
  const result = useSelector((state) => state.settingCareerInsertReducer);
  const result2 = useSelector((state) => state.settingCareerUpdateReducer);
  const result3 = useSelector((state) => state.settingCareerDeleteReducer);

  useEffect(() => {}, [result, result2, result3]);

  const [crrForm, setCrrForm] = useState([
    {
      memCode: memberCode,
      crrCode: "",
      crrName: "",
      crrPosition: "",
      crrStartDate: "",
      crrEndDate: "",
      crrState: "Y",
      crrDescription: "",
    },
  ]);

  useEffect(() => {
    if (Array.isArray(prevList.careerDTO)) {
      setCrrForm((prevForms) => {
        return prevList.careerDTO.map((crr) => ({
          memCode: memberCode,
          crrCode: crr.crrCode,
          crrName: crr.crrName,
          crrPosition: crr.crrPosition,
          crrStartDate: crr.crrStartDate,
          crrEndDate: crr.crrEndDate,
          crrState: crr.crrState,
          crrDescription: crr.crrDescription,
        }));
      });
    }
  }, [prevList]);

  const onChangeCrrHandler = (e, index) => {
    setUpdateCrrState(true);

    const { name, value } = e.target;

    setCrrForm((prevForms) => {
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
    const crrCode = prevList.careerDTO[index].crrCode;
    const findMatchCode = prevList.careerFileDTO.some(
      (file) => file.crrCode === crrCode
    );

    if (findMatchCode) {
      alert(
        "경력 증명 파일이 등록되어 있어 삭제 불가능합니다. \n 파일 먼저 삭제해 주세요"
      );
    } else {
      dispatch(callCareerDeleteAPI({ crrCode }));
    }
  };
  useEffect(() => {
    onUpdate(crrForm);
  }, [crrForm, onUpdate]);

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
          경력
          <br />
        </div>
        <div
          className="d-flex align-items-start align-items-sm-center gap-4"
          id="groupList2"
        >
          <div className="labelWrapper">
            <div className="form-label" style={{ width: "20%" }}>
              입사일
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              퇴사일
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              회사명
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              직책
            </div>
            <div className="form-label" style={{ width: "20%" }}>
              비고
            </div>
            <div className="form-label" style={{ width: "5%" }} />
          </div>
        </div>
        {Array.isArray(prevList.careerDTO) && prevList.careerDTO.length > 0
          ? prevList.careerDTO.map((crr, index) => (
              <div className="input-group3" key={index}>
                <input type="hidden" value={crr.crrCode}></input>
                <div className="inputWrapper">
                  <input
                    className="form-control3"
                    type="date"
                    style={{
                      borderTopLeftRadius: "0.375rem",
                      borderBottomLeftRadius: "0.375rem",
                    }}
                    onChange={(e) => onChangeCrrHandler(e, index)}
                    name="crrStartDate"
                    value={
                      !updateCrrState ? crr.crrStartDate : crrForm.crrStartDate
                    }
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    className="form-control3"
                    type="date"
                    onChange={(e) => onChangeCrrHandler(e, index)}
                    value={
                      !updateCrrState ? crr.crrEndDate : crrForm.crrEndDate
                    }
                    name="crrEndDate"
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="form-control3"
                    aria-describedby="basic-addon11"
                    onChange={(e) => onChangeCrrHandler(e, index)}
                    value={!updateCrrState ? crr.crrName : crrForm.crrName}
                    name="crrName"
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="form-control3"
                    aria-describedby="basic-addon11"
                    onChange={(e) => onChangeCrrHandler(e, index)}
                    value={
                      !updateCrrState ? crr.crrPosition : crrForm.crrPosition
                    }
                    name="crrPosition"
                  />
                </div>
                <div className="inputWrapper">
                  <input
                    type="text"
                    className="form-control3"
                    aria-describedby="basic-addon11"
                    onChange={(e) => onChangeCrrHandler(e, index)}
                    value={
                      !updateCrrState
                        ? crr.crrDescription
                        : crrForm.crrDescription
                    }
                    name="crrDescription"
                  />
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

export default SettingInfoCareer;
