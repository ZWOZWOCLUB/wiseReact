import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import { callSalaryFileInsertAPI, callSalaryFileUpdateAPI } from '../../apis/SettingSalAPICalls';
import { callCertificateFileUpdateAPI, callCertificateInsertAPI } from "../../apis/SettingCertificatAPICalls";
import { calCareerFileInsertAPI, callCareerFileUpdateAPI } from "../../apis/SettingCareerAPICalls";
import { callDegreeFileInsertAPI, callDegreeFileUpdateAPI } from "../../apis/SettingDegreeAPICalls";

function SettingDocument() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [salFile, setSalFile] = useState(null);
  const salFileInput = useRef();

  const [cerFile, setCerFile] = useState(null);
  const cerFileInput = useRef();

  const [crrFile, setCrrFile] = useState(null);
  const crrFileInput = useRef();

  const [degFile, setDegFile] = useState(null);
  const degFileInput = useRef();


  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  // const [prevList, setPrevList] = useState();
  console.log("############################", memberCode);
  const prevList = useSelector(state => state.settingInfoSearchReducer);
  console.log('8888888888888', prevList);


  useEffect((memCode) => {
    dispatch(callInfoSearchAPI({
      memCode: memberCode,
    }));
  }, [])


  const [activeTab, setActiveTab] = useState();

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === '프로필 정보') {
      navigate("/memberAdd", { replace: true })
    }
    if (tab === '인사 정보') {
      navigate("/settingInfo", { replace: true })
    }
    if (tab === '연차 관리') {
      navigate("/settingVacation", { replace: true })
    }
    if (tab === '서류함') {
      navigate("/settingDocument", { replace: true })
    }
  };

  //파일 다운하는 함수
  const onClickSalFileDown = async () => {
    try {
      const response = await fetch(prevList.salaryFileDTO.salAtcPath); //파일 경로 지정
      const blob = await response.blob();                              //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob]));        //다운로드 링크 생성
      const link = document.createElement('a');                        //a 요소 생성
      link.href = url;                                                 //url을 a태그의 href속성으로 지정
      link.setAttribute('download', prevList.salaryFileDTO.salAtcName);//다운로드 파일 이름 지정
      document.body.appendChild(link);                                 //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click();                                                    //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link);                               //a요소 제거
    } catch (error) {
      console.log('등록된 파일이 없습니다')
    }
  };


  const onClickCrrFileDown = async (index) => {
    try {
      const response = await fetch(prevList.careerFileDTO[index].crrAtcPath); //파일 경로 지정
      const blob = await response.blob();                              //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob]));        //다운로드 링크 생성
      const link = document.createElement('a');                        //a 요소 생성
      link.href = url;                                                 //url을 a태그의 href속성으로 지정
      link.setAttribute('download', prevList.careerFileDTO[index].crrAtcName);//다운로드 파일 이름 지정
      document.body.appendChild(link);                                 //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click();                                                    //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link);                               //a요소 제거
    } catch (error) {
      console.log('등록된 파일이 없습니다')
    }
  };

  const onClickCerFileDown = async (index) => {
    try {
      const response = await fetch(prevList.certificateFileDTO[index].cerAtcPath); //파일 경로 지정
      const blob = await response.blob();                              //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob]));        //다운로드 링크 생성
      const link = document.createElement('a');                        //a 요소 생성
      link.href = url;                                                 //url을 a태그의 href속성으로 지정
      link.setAttribute('download', prevList.certificateFileDTO[index].cerAtcName);//다운로드 파일 이름 지정
      document.body.appendChild(link);                                 //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click();                                                    //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link);                               //a요소 제거
    } catch (error) {
      console.log('등록된 파일이 없습니다')
    }
  };


  const onClickDegFileDown = async (index) => {
    try {
      const response = await fetch(prevList.documentFileDTO[index].degAtcPath); //파일 경로 지정
      const blob = await response.blob();                              //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob]));        //다운로드 링크 생성
      const link = document.createElement('a');                        //a 요소 생성
      link.href = url;                                                 //url을 a태그의 href속성으로 지정
      link.setAttribute('download', prevList.documentFileDTO[index].degAtcName);//다운로드 파일 이름 지정
      document.body.appendChild(link);                                 //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click();                                                    //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link);                               //a요소 제거
    } catch (error) {
      console.log('등록된 파일이 없습니다')
    }
  };

  const onClickDocFileDown = async (index) => {
    try {
      const response = await fetch(prevList.documentFileDTO[index].docAtcPath); //파일 경로 지정
      const blob = await response.blob();                              //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob]));        //다운로드 링크 생성
      const link = document.createElement('a');                        //a 요소 생성
      link.href = url;                                                 //url을 a태그의 href속성으로 지정
      link.setAttribute('download', prevList.documentFileDTO[index].docAtcOriginName);//다운로드 파일 이름 지정
      document.body.appendChild(link);                                 //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click();                                                    //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link);                               //a요소 제거
    } catch (error) {
      console.log('등록된 파일이 없습니다')
    }
  };

  // 파일 업로드 함수
  const handleSalFileUpload = async (salaryFile) => {
    console.log(salaryFile, 'salaryFile555555555555555')

    if (prevList.salaryFileDTO) {
      const formData = new FormData();
      formData.append("salaryFile", salaryFile);
      formData.append("salAtcCode", prevList.salaryFileDTO.salAtcCode)
      formData.append('salCode', prevList.salary.salCode)

      dispatch(callSalaryFileUpdateAPI({ formData }))
    }
    else {
      console.log(salaryFile, 'salaryFile555555555555555')

      const formData = new FormData();
      formData.append("salaryFile", salaryFile);
      formData.append('salCode', prevList.salary.salCode)
      dispatch(callSalaryFileInsertAPI({ formData }))
    }
    // window.location.reload();

  };

  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickSalFileUpload = () => {
    salFileInput.current.click();
  };

  // 파일 입력 변경 시 호출되는 함수
  const handleSalFileChange = (e) => {
    const file = e.target.files[0];
    setSalFile(file);
    handleSalFileUpload(file); // 파일을 업로드합니다.
  };

  const CertificateFileUpload = async (cerFile, index) => {
    console.log(cerFile, 'cerFile555555555555555');
    console.log(index, 'index555555555555555');

    if (prevList.certificateFileDTO) {
      console.log(index, '여기44444444444555555555555555');

      const formData = new FormData();
      formData.append("certificateFile", cerFile);
      formData.append("cerAtcCode", prevList.certificateFileDTO[index].cerAtcCode);
      formData.append('cerCode', prevList.certificateDTO[index].cerCode);
      console.log(formData, 'formData555555555555555');


      dispatch(callCertificateFileUpdateAPI({ formData }));
    } else {
      console.log(index, '여기555555555555555');
      console.log(prevList.certificateDTO[index].cerCode, '여기555555555555555');
      console.log(cerFile, '여기555555555555555');

      const formData = new FormData();
      formData.append('certificateFile', cerFile);
      formData.append('cerCode', prevList.certificateDTO[index].cerCode);

      console.log(formData, 'formData555555555555555');

      dispatch(callCertificateInsertAPI({ formData }));
    }
  };


  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickCertificateFileUpload = (index) => {
    console.log('클릭1')
    cerFileInput.current.click();
  };

  // 파일 입력 변경 시 호출되는 함수
  const CertificateFileChange = (index, e) => {
    console.log('클릭2')

    if (e.target.files.length > 0) {
      console.log('클릭3')

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setCerFile(file);
      CertificateFileUpload(file, index); // 파일을 업로드합니다.
    }
  };

  const CareerFileUpload = async (crrFile, index) => {
    console.log(crrFile, 'crrFile555555555555555');
    console.log(index, 'index555555555555555');

    if (prevList.careerDTO) {
      console.log(index, '여기44444444444555555555555555');

      const formData = new FormData();
      formData.append("careerFile", crrFile);
      formData.append("crrAtcCode", prevList.careerFileDTO[index].crrAtcCode);
      formData.append('crrCode', prevList.careerDTO[index].crrCode);
      console.log(formData, 'formData555555555555555');


      dispatch(callCareerFileUpdateAPI({ formData }));
    } else {
      console.log(index, '여기555555555555555');
      console.log(prevList.careerDTO[index].crrCode, '여기555555555555555');
      console.log(cerFile, '여기555555555555555');

      const formData = new FormData();
      formData.append('certificateFile', crrFile);
      formData.append('crrCode', prevList.careerDTO[index].crrCode);

      console.log(formData, 'formData555555555555555');

      dispatch(calCareerFileInsertAPI({ formData }));
    }
  };


  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickCareerFileUpload = (index) => {
    console.log('클릭1')
    crrFileInput.current.click();
  };

  // 파일 입력 변경 시 호출되는 함수
  const CareerFileChange = (index, e) => {
    console.log('클릭2')

    if (e.target.files.length > 0) {
      console.log('클릭3')

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setCrrFile(file);
      CareerFileUpload(file, index); // 파일을 업로드합니다.
    }
  };

  const DegreeFileUpload = async (degFile, index) => {
    console.log(degFile, 'degFile555555555555555');
    console.log(index, 'index555555555555555');

    if (prevList.degreeFileDTO) {
      console.log(index, '여기44444444444555555555555555');

      const formData = new FormData();
      formData.append("degreeFile", degFile);
      formData.append("degAtcCode", prevList.degreeFileDTO[index].degAtcCode);
      formData.append('degCode', prevList.degreeDTO[index].degCode);
      console.log(formData, 'formData555555555555555');


      dispatch(callDegreeFileUpdateAPI({ formData }));
    } else {
      console.log(index, '여기555555555555555');
      console.log(prevList.degreeDTO[index].degCode, '여기555555555555555');
      console.log(degFile, '여기555555555555555');

      const formData = new FormData();
      formData.append('degreeFile', degFile);
      formData.append('degCode', prevList.degreeDTO[index].degCode);

      console.log(formData, 'formData555555555555555');

      dispatch(callDegreeFileInsertAPI({ formData }));
    }
  };


  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickDegreeFileUpload = (index) => {
    console.log('클릭1')
    degFileInput.current.click();
  };

  // 파일 입력 변경 시 호출되는 함수
  const DegreeFileChange = (index, e) => {
    console.log('클릭2')

    if (e.target.files.length > 0) {
      console.log('클릭3')

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setDegFile(file);
      DegreeFileUpload(file, index); // 파일을 업로드합니다.
    }
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
                  {prevList.salary ?
                    <tr style={{ textAlign: "left" }} className="List" key={prevList.salaryFileDTO ? prevList.salaryFileDTO.salAtcCode : prevList.salary.salCode}>
                      <td>
                        급여통장
                      </td>
                      <td>{prevList.salaryFileDTO ? prevList.salaryFileDTO.salAtcRegistDate : '-'}</td>
                      <td>{prevList.salaryFileDTO ? prevList.salaryFileDTO.salAtcName : '증빙서류가 없습니다.'}</td>
                      <td>
                        <i
                          className="bx bx-down-arrow-alt"
                          style={{ paddingRight: 10 }}
                          onClick={onClickSalFileDown}
                        />
                      </td>
                      <td>
                        <label
                          htmlFor="salFile"
                          style={{ paddingRight: 10, cursor: "pointer" }}
                        >
                          <i className="bx bx-up-arrow-alt" />
                          <input type="file" id="salFile" name="salFile"
                            onClick={onClickSalFileUpload}
                            onChange={handleSalFileChange}
                            ref={salFileInput}
                          />
                        </label>
                      </td>
                      <td>
                        <button
                          className="bx bx-x"
                          name="btnX"
                          onclick="remove(this)"
                          style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}

                        />
                      </td>
                    </tr> : ''}
                  {Array.isArray(prevList.certificateDTO) && prevList.certificateDTO.length > 0 ? (
                    prevList.certificateDTO.map((cer, index) => (
                      <tr style={{ textAlign: "left" }} className="List" key={index}>
                        <td style={{ display: "none" }}>{cer.crrCode}</td>
                        <td>{cer.cerName} </td>
                        {Array.isArray(prevList.certificateFileDTO) && prevList.certificateFileDTO.length > 0 && prevList.certificateFileDTO[index] ? (
                          <td>{prevList.certificateFileDTO[index].cerAtcRegistDate}</td>
                        ) : (
                          <td>-</td>
                        )}
                        {Array.isArray(prevList.certificateFileDTO) && prevList.certificateFileDTO.length > 0 && prevList.certificateFileDTO[index] ? (
                          <td>{prevList.certificateFileDTO[index].cerAtcName}</td>
                        ) : (
                          <td style={{ color: "#696cff", fontWeight: "700" }}>파일을 등록해주세요</td>
                        )}
                        {Array.isArray(prevList.certificateFileDTO) && prevList.certificateFileDTO.length > 0 && prevList.certificateFileDTO[index] ? (
                          <td><i
                            className="bx bx-down-arrow-alt"
                            onClick={() => onClickCerFileDown(index)}
                          />
                          </td>
                        ) : (
                          <td><i
                            className="bx bx-down-arrow-alt"
                          /></td>
                        )}
                        {Array.isArray(prevList.certificateFileDTO) && prevList.certificateFileDTO.length > 0 && prevList.certificateFileDTO[index] ? (
                          <td>
                            <label
                              htmlFor="file"
                              style={{ paddingRight: 10, cursor: "pointer" }}
                            >
                              <i className="bx bx-up-arrow-alt" />
                              <input type="file" id="cerFileInput" name="cerFile"
                                onClick={() => onClickCertificateFileUpload(index)}
                                onChange={(e) => CertificateFileChange(index, e)}
                                ref={cerFileInput}
                              />
                            </label>
                          </td>
                        ) : (
                          <td>
                            <label
                              htmlFor="cerFile"
                              style={{ paddingRight: 10, cursor: "pointer" }}
                            >
                              <i className="bx bx-up-arrow-alt" />
                              <input type="file" id="cerFile" name="cerFile"
                                onClick={() => onClickCertificateFileUpload(index)}
                                onChange={(e) => CertificateFileChange(index, e)}
                                ref={cerFileInput}
                              />
                            </label>
                          </td>
                        )}

                        <td>
                          <button
                            className="bx bx-x"
                            name="btnX"
                            onclick="remove(this)"
                            style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                          />
                        </td>
                      </tr>
                    ))) : (
                    ''
                  )}
                  {Array.isArray(prevList.careerDTO) && prevList.careerDTO.length > 0 ? (
                    prevList.careerDTO.map((crr, index) => (
                      <tr style={{ textAlign: "left" }} className="List" key={index}>
                        <td style={{ display: "none" }}>{crr.crrCode}</td>
                        <td>{crr.crrName} 경력증명서</td>
                        {Array.isArray(prevList.careerFileDTO) && prevList.careerFileDTO.length > 0 && prevList.careerFileDTO[index] ? (
                          <td>{prevList.careerFileDTO[index].crrAtcRegistDate}</td>
                        ) : (
                          <td>-</td>
                        )}
                        {Array.isArray(prevList.careerFileDTO) && prevList.careerFileDTO.length > 0 && prevList.careerFileDTO[index] ? (
                          <td>{prevList.careerFileDTO[index].crrAtcName}</td>
                        ) : (
                          <td style={{ color: "#696cff", fontWeight: "700" }}>파일을 등록해주세요</td>
                        )}
                        {Array.isArray(prevList.careerFileDTO) && prevList.careerFileDTO.length > 0 && prevList.careerFileDTO[index] ? (
                          <td><i
                            className="bx bx-down-arrow-alt"
                            onClick={() => onClickCrrFileDown(index)}
                          />
                          </td>
                        ) : (
                          <td><i
                            className="bx bx-down-arrow-alt"
                          /></td>
                        )}
                        {Array.isArray(prevList.careerFileDTO) && prevList.careerFileDTO.length > 0 && prevList.careerFileDTO[index] ? (
                          <td>
                            <label
                              htmlFor="crrFile"
                              style={{ paddingRight: 10, cursor: "pointer" }}
                            >
                              <i className="bx bx-up-arrow-alt" />
                              <input type="file" id="crrFile" name="crrFile"
                                onClick={() => onClickCareerFileUpload(index)}
                                onChange={(e) => CareerFileChange(index, e)}
                                ref={crrFileInput}
                              />
                            </label>
                          </td>
                        ) : (
                          <td>
                            <label
                              htmlFor="crrFile"
                              style={{ paddingRight: 10, cursor: "pointer" }}
                            >
                              <i className="bx bx-up-arrow-alt" />
                              <input type="file" id="crrFile" name="crrFile"
                                onClick={() => onClickCareerFileUpload(index)}
                                onChange={(e) => CareerFileChange(index, e)}
                                ref={crrFileInput}
                              />
                            </label>
                          </td>
                        )}
                        <td>
                          <button
                            className="bx bx-x"
                            name="btnX"
                            onclick="remove(this)"
                            style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                          />
                        </td>
                      </tr>
                    ))) : (
                    ''
                  )}
                  {Array.isArray(prevList.degreeDTO) && prevList.degreeDTO.length > 0 ? (
                    prevList.degreeDTO.map((deg, index) => (
                      <tr style={{ textAlign: "left" }} className="List" key={index}>
                        <td style={{ display: "none" }}>{deg.degCode}</td>
                        <td>{deg.degName} </td>
                        {Array.isArray(prevList.degreeFileDTO) && prevList.degreeFileDTO.length > 0 && prevList.degreeFileDTO[index] ? (
                          <td>{prevList.degreeFileDTO[index].degAtcRegistDate}</td>
                        ) : (
                          <td style={{ color: "red" }}>-</td>
                        )}
                        {Array.isArray(prevList.degreeFileDTO) && prevList.degreeFileDTO.length > 0 && prevList.degreeFileDTO[index] ? (
                          <td>{prevList.degreeFileDTO[index].degAtcName}</td>
                        ) : (
                          <td style={{ color: "#696cff", fontWeight: "700" }}>파일을 등록해주세요</td>
                        )}
                        {Array.isArray(prevList.degreeFileDTO) && prevList.degreeFileDTO.length > 0 && prevList.degreeFileDTO[index] ? (
                          <td><i
                            className="bx bx-down-arrow-alt"
                            onClick={() => onClickDegFileDown(index)}
                          />
                          </td>) : (
                          <td><i
                            className="bx bx-down-arrow-alt"
                          /></td>
                        )}
                        {Array.isArray(prevList.degreeFileDTO) && prevList.degreeFileDTO.length > 0 && prevList.degreeFileDTO[index] ? (
                          <td>
                            <label
                              htmlFor="degFile"
                              style={{ paddingRight: 10, cursor: "pointer" }}
                            >
                              <i className="bx bx-up-arrow-alt" />
                              <input type="file" id="degFile" name="degFile"
                                onClick={() => onClickDegreeFileUpload(index)}
                                onChange={(e) => DegreeFileChange(index, e)}
                                ref={degFileInput}
                              />
                            </label>
                          </td>
                        ) : (
                          <td>
                            <label
                              htmlFor="degFile"
                              style={{ paddingRight: 10, cursor: "pointer" }}
                            >
                              <i className="bx bx-up-arrow-alt" />
                              <input type="file" id="degFile" name="degFile"
                                onClick={() => onClickDegreeFileUpload(index)}
                                onChange={(e) => DegreeFileChange(index, e)}
                                ref={degFileInput}
                              />
                            </label>

                          </td>
                        )}
                        <td>
                          <button
                            className="bx bx-x"
                            name="btnX"
                            onclick="remove(this)"
                            style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                          />
                        </td>
                      </tr>
                    ))) : (
                    ''
                  )}
                  {Array.isArray(prevList.documentFileDTO) && prevList.documentFileDTO.length > 0 ? (
                    prevList.documentFileDTO.map((doc, index) => (
                      <tr style={{ textAlign: "left" }} className="List" key={index}>
                        <td style={{ display: "none" }}>{doc.degCode}</td>
                        <td>{doc.docAtcKind} </td>
                        <td>{doc.docAtcRegistDate} </td>
                        <td>{doc.docAtcOriginName} </td>
                        <td><i
                          className="bx bx-down-arrow-alt"
                          onClick={() => onClickDocFileDown(index)}
                        /></td>
                        <td>
                          <label
                            htmlFor="file"
                            style={{ paddingRight: 10, cursor: "pointer" }}
                          >
                            <i className="bx bx-up-arrow-alt" />
                          </label>
                          <input type="file" id="file" />
                        </td>
                        <td>
                          <button
                            className="bx bx-x"
                            name="btnX"
                            onclick="remove(this)"
                            style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                          />
                        </td>
                      </tr>
                    ))) : (
                    ''
                  )}
                </tbody>
              </table>
              <button id="addList">+추가</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
};

export default SettingDocument;