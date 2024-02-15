import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import SettingDocumentSalary from "./SettingDocumentSalary";
import SettingDocumentCertificate from "./SettingDocumentCertificate";
import SettingDocumentCareer from "./SettingDocumentCareer";
import SettingDocumentDegree from "./SettingDocumentDegree";
import SettingDocumentETC from "./SettingDocumentETC";
import { callDocumentFileInsertAPI } from '../../apis/SettingDocumentAPICalls';

function SettingDocument() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const [rows, setRows] = useState([0]);
  const [etcFile, setEtcFile] = useState(null);
  const etcFileInput = useRef();

  const [activeTab, setActiveTab] = useState();


  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === "프로필 정보") {
      navigate(`/main/memberAdd?memCode=${memberCode}`, { replace: true });
    }
    if (tab === "인사 정보") {
      navigate(
        `/main/settingInfo?memCode=${memberCode}`,
        { replace: true });
    }
    if (tab === "연차 관리") {
      navigate(`/main/settingVacation?memCode=${memberCode}`, { replace: true });
    }
    if (tab === "서류함") {
      navigate(`/main/settingDocument?memCode=${memberCode}`, { replace: true });
    }
  };
  const [form, setForm] = useState([{
    memCode: memberCode,
    docAtcKind: '',
  }]);

  const onChangedocHandler = (e, index) => {
    const { name, value } = e.target;
    const updatedForms = [...form];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
    };
    setForm(updatedForms);
    console.log(updatedForms);
  };

  const handleAddRow = () => {
    console.log('클릭')
    setRows((prevRows) => [...prevRows, {}]);
    setForm((prevForms) => [
      ...prevForms,
      {
        memCode: memberCode,
        docAtcKind: '',
      },
    ]);
  }

  const handleRemoveRow = (index) => {
    setRows((prevRows) => prevRows.filter((row, i) => i !== index));
    setForm((prevForms) => prevForms.filter((form, i) => i !== index));
  }

  const onClickEtcFileUpload = (index) => {
    console.log('클릭1', index);
    etcFileInput.current.click();
  };

  const EtcFileChange = (index, e) => {
    console.log('클릭2')

    if (e.target.files.length > 0) {
      console.log('클릭3')

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setEtcFile(file);
      EtcFileUpload(file, index); // 파일을 업로드합니다.
    }
  };

  const EtcFileUpload = async (file, index) => {
      const formData = new FormData();
      formData.append('etcFile', file)
      formData.append('docAtcKind', form[index].docAtcKind)
      formData.append('memCode', memberCode)
      console.log(formData, 'formData555555555555555');
  
      dispatch(callDocumentFileInsertAPI({ formData }));
      window.location.reload();
  
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
              <li className={`nav-link `}
                onClick={() => handleTabClick('프로필 정보')}>
                프로필 정보
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li className={`nav-link `}
                onClick={() => handleTabClick('인사 정보')}>
                인사 정보
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li className={`nav-link active`}
                onClick={() => handleTabClick('서류함')}>
                서류함
              </li>
            </li>
            <li className={`nav-item`} style={{ cursor: "pointer" }}>
              <li className={`nav-link `}
                onClick={() => handleTabClick('연차 관리')}>
                연차 관리
              </li>
            </li>
          </ul>
          <div className="card mb-4">
            <div className="card-body">
              <table className="table table-striped" id="table">
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "5%" }} />
                </colgroup>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>증빙서류</th>
                    <th>제출일</th>
                    <th>첨부파일</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  <SettingDocumentSalary />
                  <SettingDocumentCertificate />
                  <SettingDocumentCareer />
                  <SettingDocumentDegree />
                  <SettingDocumentETC />
                  {rows.map((row, index) => (
                    <tr style={{ textAlign: "left" }} className="List" key={index}>
                      <td>
                        <input type="text"
                        onChange={(e) => onChangedocHandler(e, index)}
                          name="docAtcKind" />
                      </td>
                      <td>-</td>
                      <td>-</td>
                      <td><i
                        className="bx bx-down-arrow-alt"
                      />
                      </td>
                      <td>
                        <label
                          htmlFor="etcFile"
                          style={{ paddingRight: 10, cursor: "pointer" }}
                        >
                          <i className="bx bx-up-arrow-alt" />
                          <input type="file" id="etcFile" name="etcFile"
                                            onClick={() => onClickEtcFileUpload(index)}
                                            onChange={(e) => EtcFileChange(index, e)}
                                            ref={etcFileInput}
                          />
                        </label>
                      </td>
                      <td>
                        <button
                          className="bx bx-x"
                          name="btnX"
                          onClick={() => handleRemoveRow(index)}
                          style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="addList" onClick={() => handleAddRow()}>
                +추가
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default SettingDocument;