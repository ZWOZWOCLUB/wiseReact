import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import SettingInfoSalary from "./settingInfoSalary";
import SettingInfoUpdateCertificate from "./settingInfoUpdateCertificate";
import SettingInfoInsertCertificate from "./settingInfoInsertCertificate";
import SettingInfoUpdateCareer from "./settingInfoUpdateCareer";
import SettingInfoInsertCareer from "./settingInfoInsertCareer";
import SettingInfoDegree from "./settingInfoUpdateDegree";
import {
  callCertificateInsertAPI,
  callCertificateUpdateAPI,
} from "../../apis/SettingCertificatAPICalls";
import {
  callCareerInsertAPI,
  callCareerUpdateAPI,
} from "../../apis/SettingCareerAPICalls";
import {
  callDegreeInsertAPI,
  callDegreeUpdateAPI,
} from "../../apis/SettingDegreeAPICalls";
import {
  callSalaryInsertAPI,
  callSalaryUpdateAPI,
} from "../../apis/SettingSalAPICalls";
import SettingInfoInsertDegree from "./settingInfoInsertDegree";

function SettingInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const scrollRef = useRef();
  const [insertEvent, setInsertEvent] = useState(false);

  const prevList = useSelector((state) => state.settingCareerInsertReducer);
  const result = useSelector((state) => state.settingCareerUpdateReducer);
  const result2 = useSelector((state) => state.settingCareerDeleteReducer);
  const result3 = useSelector((state) => state.settingDegreeInsertReducer);
  const result4 = useSelector((state) => state.settingDegreeUpdateReducer);
  const result5 = useSelector((state) => state.settingDegreeDeleteReducer);
  const result6 = useSelector((state) => state.settingCertificateInsertReducer);
  const result7 = useSelector((state) => state.settingCertificateUpdateReducer);
  const result8 = useSelector((state) => state.settingCertificateDeleteReducer);
  const result9 = useSelector((state) => state.settingDocumentInsertReducer);
  const result10 = useSelector((state) => state.settingDocumentUpdateReducer);
  const result11 = useSelector((state) => state.settingDocumentDeleteReducer);
  const result12 = useSelector((state) => state.settingSalaryInsertReducer);
  const result13 = useSelector((state) => state.settingSalaryUpdateReducer);
  const result14 = useSelector((state) => state.settingSalaryDeleteReducer);
  console.log("prevList", prevList);
  useEffect(
    (memCode) => {
      dispatch(
        callInfoSearchAPI({
          memCode: memberCode,
        })
      );
    },
    [
      memberCode,
      result,
      result2,
      result3,
      result4,
      result5,
      result6,
      result7,
      result8,
      result9,
      result10,
      result11,
      result12,
      result13,
      result14,
    ]
  );
  console.log(prevList);

  const [stateIndex, setStateIndex] = useState();
  const [activeTab, setActiveTab] = useState();

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "프로필 정보") {
      navigate(`/main/memberdetails?memCode=${memberCode}`, { replace: true });
    }
    if (tab === "인사 정보") {
      navigate(`/main/settingInfo?memCode=${memberCode}`, { replace: true });
    }
    if (tab === "연차 관리") {
      navigate(`/main/settingVacation?memCode=${memberCode}`, {
        replace: true,
      });
    }
    if (tab === "서류함") {
      navigate(`/main/settingDocument?memCode=${memberCode}`, {
        replace: true,
      });
    }
  };
  const [salForm, setSalForm] = useState({
    memCode: memberCode,
    salCode: "",
    salNumber: "",
    salBankName: "",
  });

  const [insertCrrForm, setInsertCrrForm] = useState([
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

  const [insertDegForm, setInsertDegForm] = useState([
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

  const [insertCerForm, setInsertCerForm] = useState([
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

  const [updateCrrForm, setUpdateCrrForm] = useState([
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

  const [updateDegForm, setUpdateDegForm] = useState([
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

  const [updateCerForm, setUpdateCerForm] = useState([
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

  const SalaryUpdate = (data) => {
    setSalForm(data);
  };
  const CertificateUpdate = (data) => {
    setUpdateCerForm(data);
  };
  const CertificateInsert = (data) => {
    setInsertCerForm(data);
  };
  const CareerUpdate = (data) => {
    setUpdateCrrForm(data);
  };
  const CareerInsert = (data) => {
    setInsertCrrForm(data);
  };
  const DegreeUpdate = (data) => {
    setUpdateDegForm(data);
  };
  const DegreeInsert = (data) => {
    setInsertDegForm(data);
  };

  const onClickSave = () => {
    if (salForm.salCode) {
      dispatch(callSalaryUpdateAPI({ salForm }));
    } else {
      dispatch(callSalaryInsertAPI({ salForm }));
    }
    dispatch(callCertificateInsertAPI({ insertCerForm }));
    dispatch(callCareerInsertAPI({ insertCrrForm }));
    dispatch(callDegreeInsertAPI({ insertDegForm }));
    dispatch(callCertificateUpdateAPI({ updateCerForm }));
    dispatch(callCareerUpdateAPI({ updateCrrForm }));
    dispatch(callDegreeUpdateAPI({ updateDegForm }));
    console.log("통장정보", salForm);
    console.log("자격정보등록", insertCerForm);
    console.log("경력정보등록", insertCrrForm);
    console.log("학위정보등록", insertDegForm);
    console.log("자격정보수정", updateCerForm);
    console.log("경력정보수정", updateCrrForm);
    console.log("학위정보수정", updateDegForm);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setInsertEvent(0);
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4" ref={(e) => (scrollRef.current = e)}>
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
              <SettingInfoSalary onUpdate={SalaryUpdate} />
              <SettingInfoUpdateCertificate onUpdate={CertificateUpdate} />
              <SettingInfoInsertCertificate
                onUpdate={CertificateInsert}
                insertEvent={insertEvent}
              />
              <SettingInfoUpdateCareer onUpdate={CareerUpdate} />
              <SettingInfoInsertCareer
                onUpdate={CareerInsert}
                insertEvent={insertEvent}
              />
              <SettingInfoDegree onUpdate={DegreeUpdate} />
              <SettingInfoInsertDegree
                onUpdate={DegreeInsert}
                insertEvent={insertEvent}
              />
              <br />
              <div className="btn-wrapper">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClickSave}
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
