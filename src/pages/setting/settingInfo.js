import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callCertificateInsertAPI } from "../../apis/SettingCertificatAPICalls";
import { callCareerInsertAPI } from "../../apis/SettingCareerAPICalls";
import { callDegreeInsertAPI, callDegreeUpdateAPI } from "../../apis/SettingDegreeAPICalls";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";

function SettingInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const [cerCode, setCerCode] = useState();
  const [crrCode, setCrrCode] = useState();
  const [degCode, setDegCode] = useState();
  const [salCode, setSalCode] = useState();
  // const [prevList, setPrevList] = useState();
  console.log("############################", memberCode);
  const cerList = useSelector((state) => state.settingCertificateReducer);
  const crrList = useSelector((state) => state.settingCareerReducer);
  const degList = useSelector((state) => state.settingDegreeReducer);
  const prevList = useSelector(state => state.settingInfoSearchReducer);
  const [updateCerState, setUpdateCerState] = useState(false);
  const [updateCrrState, setUpdateCrrState] = useState(false);
  const [updateDegState, setUpdateDegState] = useState(false);
  const [updateSalState, setUpdateSalState] = useState(false);




  useEffect((memCode) => {
    dispatch(callInfoSearchAPI({
      memCode: memberCode,
    }));
  }, [])

  console.log('8888888888888', prevList);
  const [stateIndex, setStateIndex] = useState();
  const [activeTab, setActiveTab] = useState();
  const [certificateRows, setCertificateRows] = useState([0]);
  const [careerRows, setCareerRows] = useState([0]);
  const [degreeRows, setDegreeRows] = useState([0]);
  const [salForm, setSalForm] = useState({
    memCode: memberCode,
    salCode: "",
    salNumber: "",
    salBankName: "",
  });
  console.log('!!!!!!!!!!!!!!!!!!', salForm)
  // const [salForm, setSalForm] = useState({});
  console.log('!!!!!!!!!!!!!!!!!!', salForm)


  const onChangeSalHandler = (e) => {
    setUpdateSalState(true)
    setSalForm({
      ...salForm,
      [e.target.name]: e.target.value
    })
    console.log(salForm)
  };

  const [cerForm, setCerForm] = useState([
    {
      memCode: memberCode,
      cerCode: prevList.certificateDTO ? prevList.certificateDTO.cerCode : "",
      cerName: prevList.certificateDTO ? prevList.certificateDTO.cerName : "",
      cerKind: prevList.certificateDTO ? prevList.certificateDTO.cerKind : "",
      cerDay: "",
      cerEndDate: "",
      cerDescription: "",
      cerInstitution: "",
    },
  ]);
  console.log('11111111111111111111', cerForm)

  const onChangeCerHandler = (e, index) => {
    setUpdateCerState(true)
    setCerForm({
      ...cerForm,
      [e.target.name]: e.target.value
    })
    const { name, value } = e.target;
    const updatedForms = [...cerForm];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
    };
    setCerForm(updatedForms);
    console.log(updatedForms);
  };

  const [crrForm, setCrrForm] = useState([{
    memCode: memberCode,
    crrCode: "",
    crrName: "",
    crrPosition: "",
    crrStartDate: "",
    crrEndDate: "",
    crrState: "Y",
    crrDescription: "",
  }]);

  const onChangeCrrHandler = (e, index) => {
    setUpdateCrrState(true)
    const { name, value } = e.target;
    const updatedForms = [...crrForm];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
    };
    setCrrForm(updatedForms);
    console.log(updatedForms);
  };

  const [degForm, setDegForm] = useState([{
    memCode: memberCode,
    degCode: "",
    degKind: "",
    degMajor: "",
    degName: "",
    degGraduation: "",
    degState: "",
    degAdmissions: "",
  }]);

  const onChangeDegHandler = (e, index) => {
    setUpdateDegState(true)
    const { name, value } = e.target;
    const updatedForms = [...degForm];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
    };
    setDegForm(updatedForms);
    console.log(updatedForms);
  };

  const handleAddRow = (section) => {
    if (section === "certificate") {
      console.log('클릭', certificateRows)
      setCertificateRows((prevRows) => [...prevRows, {}]);
      setCerForm((prevForms) => [
        ...prevForms,
        {
          memCode: memberCode,
          cerCode: "",
          cerName: "",
          cerKind: "",
          cerDay: "",
          cerEndDate: "",
          cerDescription: "",
          cerInstitution: "",
        },
      ]);
    } else if (section === "career") {
      setCareerRows((prevRows) => [...prevRows, {}]);
      setCrrForm((prevForms) => [
        ...prevForms,
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
    } else if (section === "degree") {
      setDegreeRows((prevRows) => [...prevRows, {}]);
      setDegForm((prevForms) => [
        ...prevForms,
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
    }
  };



  const handleRemoveRow = (section, index) => {
    if (section === "certificate") {
      setCertificateRows((prevRows) => prevRows.filter((row, i) => i !== index));
      setCerForm((prevForms) => prevForms.filter((form, i) => i !== index));
    } else if (section === "career") {
      console.log("클릭")
      console.log(index)
      setCareerRows((prevRows) => prevRows.filter((row, i) => i !== index));
      setCrrForm((prevForms) => prevForms.filter((form, i) => i !== index));
    } else if (section === "degree") {
      setDegreeRows((prevRows) => prevRows.filter((row, i) => i !== index));
      setDegForm((prevForms) => prevForms.filter((form, i) => i !== index));
    }
  };





  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "프로필 정보") {
      navigate("/memberAdd", { replace: true });
    }
    if (tab === "인사 정보") {
      navigate(
        `/settingInfo?memCode=${memberCode}`,
        { replace: true });
    }
    if (tab === "연차 관리") {
      navigate(`/settingVacation?memCode=${memberCode}`, { replace: true });
    }
    if (tab === "서류함") {
      navigate(`/settingDocument?memCode=${memberCode}`, { replace: true });
    }
  };

  const onClickInfomationResistartionHanlder = () => {
    console.log(onClickInfomationResistartionHanlder);

    dispatch(
      callCertificateInsertAPI({
        cerForm: cerForm,
      })
    );
    dispatch(
      callCareerInsertAPI({
        crrForm: crrForm,
      })
    );
    dispatch(
      callDegreeInsertAPI({
        degForm: degForm,
      })
    );
    // dispatch(
    //   callDegreeUpdateAPI({
    //     updatedForm: prevList.
    //   })
    // )
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">설정 &gt;</span> 직원 등록
      </h4>
      <div className="col-xxl">
        <div className="card mb-4"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <ul className="nav nav-pills flex-column flex-md-row mb-3">
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link `}
                onClick={() => handleTabClick("프로필 정보")}
              >
                프로필 정보
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link active`}
                onClick={() => handleTabClick("인사 정보")}
              >
                인사 정보
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link `}
                onClick={() => handleTabClick("서류함")}
              >
                서류함
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li
                className={`nav-link `}
                onClick={() => handleTabClick("연차 관리")}
              >
                연차 관리
              </li>
            </li>
          </ul>
          <div className="card mb-4">
            <div className="card-body">
              <div>
                <div
                  style={{
                    color: "#696cff",
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  급여 통장 정보
                  <br />
                </div>
                <div
                  className="d-flex align-items-start align-items-sm-center gap-4"
                  id="groupList1"
                >
                  <div className="labelWrapper">
                    <div className="form-label" style={{ width: "50%" }}>
                      은행명
                    </div>
                    <div className="form-label" style={{ width: "50%" }}>
                      통장번호
                    </div>
                    <div className="form-label" style={{ width: "5%" }} />
                  </div>
                </div>
                <div className="input-group3">
                  <input type="hidden"
                    value=
                    {(!updateSalState ? (prevList.salary === undefined ?
                      0 :
                      prevList.salary.salCode) : salForm.salCode)
                    }
                  />
                  <div className="inputWrapper">
                    <input
                      type="text"
                      className="form-control3"
                      aria-describedby="basic-addon11"
                      name="salBankName"
                      value=
                      {(!updateSalState ? (prevList.salary === undefined ?
                        '' :
                        prevList.salary.salBankName) : salForm.salBankName)
                      }
                      onChange={onChangeSalHandler}
                    />
                  </div>
                  <div className="inputWrapper">
                    <input
                      type="number"
                      className="form-control3"
                      aria-describedby="basic-addon11"
                      name="salNumber"
                      value=
                      {(!updateSalState ? (prevList.salary === undefined ?
                        0 :
                        prevList.salary.salNumber) : salForm.salNumber)
                      }
                      onChange={onChangeSalHandler}
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
                        style={{
                          border: 0,
                          backgroundColor: "rgba(0, 0, 0, 0)",
                        }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
              <br />
              <div>
                <div
                  style={{
                    color: "#696cff",
                    fontWeight: "bold",
                    fontSize: "large",
                  }}
                >
                  자격
                  <br />
                </div>
                <div
                  className="d-flex align-items-start align-items-sm-center gap-4"
                  id="groupList1"
                >
                  <div className="labelWrapper">
                    <div className="form-label" style={{ width: "24%" }}>
                      취득일자
                    </div>
                    <div className="form-label" style={{ width: "24%" }}>
                      자격만료일
                    </div>
                    <div className="form-label" style={{ width: "24%" }}>
                      취득자격
                    </div>
                    <div className="form-label" style={{ width: "24%" }}>
                      자격번호
                    </div>
                    <div className="form-label" style={{ width: "24%" }}>
                      발행기관
                    </div>
                    <div className="form-label" style={{ width: "24%" }}>
                      비고
                    </div>
                    <div className="form-label" style={{ width: "5%" }} />
                  </div>
                </div>
                {Array.isArray(prevList.certificateDTO) && prevList.certificateDTO.length > 0 ? (
                  prevList.certificateDTO.map((cer, index) => (
                    <div className="input-group3" key={index}>
                      <input type="hidden" value={cer.cerCode} />
                      <div className="inputWrapper">
                        <input
                          className="form-control3"
                          type="date"
                          style={{
                            borderTopLeftRadius: "0.375rem",
                            borderBottomLeftRadius: "0.375rem",
                          }}
                          onChange={(e) => onChangeCerHandler(e, index)}
                          name="cerDay"
                          value={(!updateCerState ? cer.cerDay : cerForm.cerDay)}
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="date"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCerHandler(e, index)}
                          name="cerEndDate"
                          value={cer.cerEndDate}
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCerHandler(e, index)}
                          name="cerName"
                          value={(!updateCerState ? cer.cerName : cerForm.cerName)}
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="number"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCerHandler(e, index)}
                          name="cerKind"
                          value={cer.cerKind}

                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCerHandler(e, index)}
                          name="cerInstitution"
                          value={cer.cerInstitution}

                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCerHandler(e, index)}
                          name="cerDescription"
                          value={cer.cerDescription}

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
                            onClick={() => handleRemoveRow("certificate", index)}
                            style={{
                              border: 0,
                              backgroundColor: "rgba(0, 0, 0, 0)",
                            }}
                          ></button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : null}
                {certificateRows.map((row, index) => (
                  <div className="input-group3" key={index}>
                    <div className="inputWrapper">
                      <input
                        className="form-control3"
                        type="date"
                        style={{
                          borderTopLeftRadius: "0.375rem",
                          borderBottomLeftRadius: "0.375rem",
                        }}
                        onChange={(e) => onChangeCerHandler(e, index)}
                        name="cerDay"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="date"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={(e) => onChangeCerHandler(e, index)}
                        name="cerEndDate"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        name="cerName"
                        onChange={(e) => onChangeCerHandler(e, index)}
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="number"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={(e) => onChangeCerHandler(e, index)}
                        name="cerKind"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={(e) => onChangeCerHandler(e, index)}
                        name="cerInstitution"
                      />
                    </div>

                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={(e) => onChangeCerHandler(e, index)}
                        name="cerDescription"
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
                          onClick={() => handleRemoveRow("certificate", index)}
                          style={{
                            border: 0,
                            backgroundColor: "rgba(0, 0, 0, 0)",
                          }}
                        ></button>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
              <div
                className="addList"
                onClick={() => handleAddRow("certificate")}
              >
                +추가
              </div>
              <br />
              <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
              <br />
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
                {Array.isArray(prevList.careerDTO) && prevList.careerDTO.length > 0 ? (
                  prevList.careerDTO.map((crr, index) => (
                    <div className="input-group3" key={index}>
                      <input type="hidden"
                        value={crr.crrCode}
                      ></input>
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
                          value={crr.crrStartDate}
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          className="form-control3"
                          type="date"
                          onChange={(e) => onChangeCrrHandler(e, index)}
                          value={crr.crrEndDate}
                          name="crrEndDate"
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCrrHandler(e, index)}
                          value={crr.crrName}
                          name="crrName"
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCrrHandler(e, index)}
                          value={crr.crrPosition}
                          name="crrPosition"
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeCrrHandler(e, index)}
                          value={crr.crrDescription}
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
                            onClick={() => handleRemoveRow("career", index)}
                            style={{
                              border: 0,
                              backgroundColor: "rgba(0, 0, 0, 0)",
                            }}
                          ></button>
                        </div>
                      </div>
                    </div>
                  ))) : null
                }
                {careerRows.map((row, index) => (
                  <div className="input-group3" key={index}>
                    <div className="inputWrapper">
                      <input
                        className="form-control3"
                        type="date"
                        style={{
                          borderTopLeftRadius: "0.375rem",
                          borderBottomLeftRadius: "0.375rem",
                        }}
                        onChange={onChangeCrrHandler}
                        name="crrStartDate"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        className="form-control3"
                        type="date"
                        onChange={onChangeCrrHandler}
                        name="crrEndDate"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={onChangeCrrHandler}
                        name="crrName"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={onChangeCrrHandler}
                        name="crrPosition"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={onChangeCrrHandler}
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
                          onClick={() => handleRemoveRow("career", index)}
                          style={{
                            border: 0,
                            backgroundColor: "rgba(0, 0, 0, 0)",
                          }}
                        ></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="addList" onClick={() => handleAddRow(`career`)}>
                +추가
              </div>

              <br />
              <hr className="m-0" style={{ marginTop: 20, marginBottom: 20 }} />
              <br />
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
                {Array.isArray(prevList.degreeDTO) && prevList.degreeDTO.length > 0 ? (
                  prevList.degreeDTO.map((deg, index) => (
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
                          value={deg.degAdmissions}
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          className="form-control3"
                          type="date"
                          onChange={(e) => onChangeDegHandler(e, index)}
                          value={deg.degGraduation}
                          name="degGraduation"
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeDegHandler(e, index)}
                          value={deg.degName}
                          name="degName"
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          onChange={(e) => onChangeDegHandler(e, index)}
                          aria-describedby="basic-addon11"
                          value={deg.degMajor}
                          name="degMajor"
                        />
                      </div>
                      <div className="inputWrapper">
                        <input
                          type="text"
                          className="form-control3"
                          aria-describedby="basic-addon11"
                          onChange={(e) => onChangeDegHandler(e, index)}
                          value={deg.degKind}
                          name="degKind"
                        />
                      </div>
                      <div className="inputWrapper">
                        <select name="degState" className="form-select1"
                          onChange={(e) => onChangeDegHandler(e, index)}
                          value={deg.degState}

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
                            onClick={() => handleRemoveRow("degree", index)}
                            style={{
                              border: 0,
                              backgroundColor: "rgba(0, 0, 0, 0)",
                            }}
                          ></button>
                        </div>
                      </div>
                    </div>
                  ))) :
                  null
                }
                {degreeRows.map((row, index) => (
                  <div className="input-group3" key={index}>
                    <div className="inputWrapper">
                      <input
                        className="form-control3"
                        type="date"
                        style={{
                          borderTopLeftRadius: "0.375rem",
                          borderBottomLeftRadius: "0.375rem",
                        }}
                        onChange={onChangeDegHandler}
                        name="degAdmissions"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        className="form-control3"
                        type="date"
                        onChange={onChangeDegHandler}
                        name="degGraduation"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={onChangeDegHandler}
                        name="degName"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        onChange={onChangeDegHandler}
                        aria-describedby="basic-addon11"
                        id="degMajor"
                      />
                    </div>
                    <div className="inputWrapper">
                      <input
                        type="text"
                        className="form-control3"
                        aria-describedby="basic-addon11"
                        onChange={onChangeDegHandler}
                        name="degKind"
                      />
                    </div>
                    <div className="inputWrapper">
                      <select name="degState" className="form-select1">
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
                          onClick={() => handleRemoveRow("degree", index)}
                          style={{
                            border: 0,
                            backgroundColor: "rgba(0, 0, 0, 0)",
                          }}
                        ></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="addList" onClick={() => handleAddRow(`degree`)}>
                +추가
              </div>

              <br />
              <div className="btn-wrapper">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClickInfomationResistartionHanlder}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingInfo;
