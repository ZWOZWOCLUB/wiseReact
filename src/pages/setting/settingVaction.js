import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callVacAPI, callVacHisAPI } from "../../apis/MyPageAPICalls";
import { callMemberVacationAPI } from "../../apis/SettingMemberAPICalls";

function SettingVacation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const [activeTab, setActiveTab] = useState();
  const vac = useSelector((state) => state.mpVacReducer);
  const vacHis = useSelector((state) => state.mpVacHisReducer);
  const vacData = vac.data;
  const vacHisData = vacHis.data;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const [selectedOption, setSelectedOption] = useState(formattedDate);

  useEffect(() => {
    dispatch(
      callVacAPI({
        memCode: memberCode,
      })
    );
    dispatch(
      callVacHisAPI({
        memCode: memberCode,
        year: selectedOption, // 이건 나중에 원하는 년도를 넘겨주면 그 해당 날짜 데이터를 받을 수 있음
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      callVacHisAPI({
        memCode: memberCode,
        year: selectedOption,
      })
    );
  }, [selectedOption]);
  console.log(vacData);
  console.log(vacHisData);

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
  function getLastDayOfMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  const year = new Date().getFullYear();
  const lastDayOfMonth = getLastDayOfMonth(2, year);
  console.log(`${year}.03.${lastDayOfMonth} 소멸 예정`);

  const [form, setForm] = useState({
    memCode: memberCode,
    vctCount: 0,
  });

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form, "!!!!!!!!!!!!!!!");
  };
  const onEnterKeyHandler = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key");
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    dispatch(
      callMemberVacationAPI({
        memCode: memberCode,
        vctCount: form.vctCount,
      })
    );

    window.location.reload();
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
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
                className={`nav-link `}
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
                className={`nav-link active`}
                onClick={() => handleTabClick("연차 관리")}
              >
                연차 관리
              </li>
            </li>
          </ul>
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
              <div className="col-6 mb-4">
                <div className="card h-100">
                  <div className="card-header d-flex align-items-center justify-content-between">
                    <h5 className="card-title m-0 me-2">
                      올해 사용한 연차
                      <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <small></small>
                      </span>
                    </h5>
                    <div className="dropdown">
                      <select value={selectedOption} onChange={handleChange}>
                        <option value={formattedDate}>{formattedDate}</option>
                        <option value={formattedDate - 1}>
                          {formattedDate - 1}
                        </option>
                        <option value={formattedDate - 2}>
                          {formattedDate - 2}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="card-body" style={{ overflowY: "auto" }}>
                    <div className="table-responsive text-nowrap">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>사용 시작 일자</th>
                            <th>사용 종료 일자</th>
                          </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                          {vacHisData ? (
                            vacHisData.map((v, index) => (
                              <tr>
                                <td>{v.vacStartDate}</td>
                                <td>{v.vacEndDate}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="text-center">
                                사용한 이력이 없습니다.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-4">
                <div className="card" id="firstItem">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../../assets/img/icons/unicons/cc-primary.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span className="fw-semibold d-block mb-1">
                          사용 가능 연차
                        </span>
                        <h3 className="card-title mb-2">
                          {vacData ? vacData.vctCount : 0}회
                        </h3>
                      </div>
                      <div style={{ width: "50%" }}>
                        <span className="fw-semibold d-block mb-1">
                          연차 수정
                        </span>
                        <div>
                          <input
                            type="number"
                            className="card-title mb-2"
                            name="vctCount"
                            onChange={(e) => onChangeHandler(e)}
                            onKeyUp={onEnterKeyHandler}
                          />
                          <button
                            className="btn btn-sm btn-outline-primary"
                            style={{ marginLeft: 10, marginTop: 10 }}
                            onClick={onClickHandler}
                          >
                            수정
                          </button>
                        </div>
                        <small className="text-success fw-semibold">
                          음수를 입력하면 차감됩니다.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card" id="secondItem">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../../assets/img/icons/unicons/cc-primary.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">
                      소멸 예정 연차
                    </span>
                    <h3 className="card-title mb-2">
                      {vacData ? vacData.vctDeadline : 0}회
                    </h3>
                    <small className="text-success fw-semibold">
                      {`${year}.03.${lastDayOfMonth}`} 소멸 예정
                    </small>
                  </div>
                </div>
                <div className="card" id="thirdItem">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../../assets/img/icons/unicons/cc-primary.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">
                      누적 사용 연차
                    </span>
                    <h3 className="card-title mb-2">
                      {vacData ? vacData.vctAmountSpendVacation : 0}회
                    </h3>
                    <small className="text-success fw-semibold">
                      이번년도 기준
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingVacation;
