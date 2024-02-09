import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import coreCSS from "../../@core/vendor/css/core.module.css";
import payCSS from "../../@core/css/pay.module.css";
import { callCertificateInsertAPI } from "../../apis/SettingMemberAddAPICalls";

function SettingInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  console.log("############################", memberCode);

  const [activeTab, setActiveTab] = useState();
  const [certificateRows, setCertificateRows] = useState([0]);
  const [careerRows, setCareerRows] = useState([0]);
  const [degreeRows, setDegreeRows] = useState([0]);
  const [cerForm, setCerForm] = useState([
    {
      memCode: memberCode,
      cerName: "",
      cerKind: "",
      cerDay: "",
      cerEndDate: "",
      cerDescription: "",
      cerInstitution: "",
    },
  ]);

  const onChangeCerHandler = (e, index) => {
    const { name, value } = e.target;
    const updatedForms = [...cerForm];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
    };
    setCerForm(updatedForms);
    console.log(updatedForms);
  };

  const [crrForm, setCrrForm] = useState({
    memCode: memberCode,
    crrName: "",
    crrPosition: "",
    crrStartDate: "",
    crrEndDate: "",
    crrState: "Y",
    crrDescription: "",
  });

  const onChangeCrrHandler = (e) => {
    setCrrForm({
      ...crrForm,
      [e.target.name]: e.target.value,
    });
    console.log(crrForm);
  };

  const [degForm, setDegForm] = useState({
    memCode: memberCode,
    degKind: "",
    degMajor: "",
    degName: "",
    degGraduation: "",
    degState: "",
    degAdmissions: "",
  });

  const onChangeDegHandler = (e) => {
    setDegForm({
      ...degForm,
      [e.target.name]: e.target.value,
    });
    console.log(degForm);
  };

  const handleAddRow = (section) => {
    if (section === "certificate") {
      setCertificateRows((prevRows) => [...prevRows, {}]);
      setCerForm((prevForms) => [
        ...prevForms,
        {
          memCode: memberCode,
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
    } else if (section === "degree") {
      setDegreeRows((prevRows) => [...prevRows, {}]);
    }
  };

  const handleRemoveRow = (section, index) => {
    console.log(index);
    if (section === "certificate") {
      if (certificateRows.length === 0) {
        const updatedRows = [...certificateRows];
        updatedRows[index] = {};
        setCertificateRows(updatedRows);
      } else {
        setCertificateRows((prevRows) =>
          prevRows.filter((row, i) => i !== index)
        );
      }
    } else if (section === "career") {
      if (careerRows.length === 0) {
        const updatedRows = [...careerRows];
        updatedRows[index] = {};
        setCareerRows(updatedRows);
      } else {
        setCareerRows((prevRows) => prevRows.filter((row, i) => i !== index));
      }
    } else if (section === "degree") {
      if (degreeRows.length === 0) {
        const updatedRows = [...degreeRows];
        updatedRows[index] = {};
        setDegreeRows(updatedRows);
      } else {
        setDegreeRows((prevRows) => prevRows.filter((row, i) => i !== index));
      }
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "프로필 정보") {
      navigate("/memberAdd", { replace: true });
    }
    if (tab === "인사 정보") {
      navigate("/settingInfo", { replace: true });
    }
    if (tab === "연차 관리") {
      navigate("/settingVacation", { replace: true });
    }
    if (tab === "서류함") {
      navigate("/settingDocument", { replace: true });
    }
  };

  const onClickInfomationResistartionHanlder = () => {
    console.log(onClickInfomationResistartionHanlder);

    dispatch(
      callCertificateInsertAPI({
        cerForm: cerForm,
      })
    );
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">설정 &gt;</span> 직원 등록
      </h4>
      {/* Basic Layout */}
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
