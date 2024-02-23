import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import {
  callCertificateFileUpdateAPI,
  callCertificateFileInsertAPI,
  callCertificateFileDELETEAPI,
} from "../../apis/SettingCertificatAPICalls";

function SettingDocumentCertificate() {
  const dispatch = useDispatch();
  const [cerFile, setCerFile] = useState(null);
  const cerFileInput = useRef();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const result = useSelector((state) => state.settingCertificateReducer);

  useEffect(
    (memCode) => {
      dispatch(
        callInfoSearchAPI({
          memCode: memberCode,
        })
      );
    },
    [result]
  );

  const onClickCerFileDown = async (index) => {
    try {
      const urlPath =
        "http://localhost:8001" +
        "/certificate/" +
        prevList.certificateFileDTO[index].cerAtcConvertName;
      console.log(urlPath);

      const response = await fetch(urlPath); //파일 경로 지정

      const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
      const link = document.createElement("a"); //a 요소 생성
      link.href = url; //url을 a태그의 href속성으로 지정
      link.setAttribute(
        "download",
        prevList.certificateFileDTO[index].cerAtcName
      ); //다운로드 파일 이름 지정
      document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click(); //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link); //a요소 제거
    } catch (error) {
      console.log("등록된 파일이 없습니다");
    }
  };

  const CertificateFileUpload = async (cerFile, index) => {
    console.log(cerFile, "cerFile555555555555555");
    console.log(index, "index555555555555555");

    if (prevList.certificateFileDTO && prevList.certificateFileDTO[index] > 0) {
      console.log(index, "여기44444444444555555555555555");

      const formData = new FormData();
      formData.append("certificateFile", cerFile);
      formData.append(
        "cerAtcCode",
        prevList.certificateFileDTO[index].cerAtcCode
      );
      formData.append("cerCode", prevList.certificateDTO[index].cerCode);
      console.log(formData, "formData555555555555555");

      dispatch(callCertificateFileUpdateAPI({ formData }));
    } else {
      console.log(index, "여기555555555555555");
      console.log(
        prevList.certificateDTO[index].cerCode,
        "여기555555555555555"
      );
      console.log(cerFile, "여기555555555555555");

      const formData = new FormData();
      formData.append("certificateFile", cerFile);
      formData.append("cerCode", prevList.certificateDTO[index].cerCode);

      console.log(formData, "formData555555555555555");

      dispatch(callCertificateFileInsertAPI({ formData }));
    }
  };

  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickCertificateFileUpload = (index) => {
    console.log("클릭1");
    cerFileInput.current.click();
  };

  // 파일 입력 변경 시 호출되는 함수
  const CertificateFileChange = (index, e) => {
    console.log("클릭2");

    if (e.target.files.length > 0) {
      console.log("클릭3");

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setCerFile(file);
      CertificateFileUpload(file, index); // 파일을 업로드합니다.
    }
  };
  const onClickCertificateFileDelete = (index) => {
    console.log("클릭~~~~~~~", index);
    const formData = new FormData();
    formData.append(
      "cerAtcCode",
      prevList.certificateFileDTO[index].cerAtcCode
    );
    dispatch(callCertificateFileDELETEAPI({ formData }));
  };

  return (
    <>
      {Array.isArray(prevList.certificateDTO) &&
      prevList.certificateDTO.length > 0
        ? prevList.certificateDTO.map((cer, index) => (
            <tr style={{ textAlign: "left" }} className="List" key={index}>
              <td style={{ display: "none" }}>{cer.cerCode}</td>
              <td>{cer.cerName} </td>
              {Array.isArray(prevList.certificateFileDTO) &&
              prevList.certificateFileDTO.length > 0 &&
              prevList.certificateFileDTO[index] ? (
                <td>{prevList.certificateFileDTO[index].cerAtcRegistDate}</td>
              ) : (
                <td>-</td>
              )}
              {Array.isArray(prevList.certificateFileDTO) &&
              prevList.certificateFileDTO.length > 0 &&
              prevList.certificateFileDTO[index] ? (
                <td>{prevList.certificateFileDTO[index].cerAtcName}</td>
              ) : (
                <td style={{ color: "#696cff", fontWeight: "700" }}>
                  파일을 등록해주세요
                </td>
              )}
              {Array.isArray(prevList.certificateFileDTO) &&
              prevList.certificateFileDTO.length > 0 &&
              prevList.certificateFileDTO[index] ? (
                <td>
                  <i
                    className="bx bx-down-arrow-alt"
                    onClick={() => onClickCerFileDown(index)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              ) : (
                <td>
                  <i
                    className="bx bx-down-arrow-alt"
                    style={{ cursor: "pointer" }}
                  />
                </td>
              )}
              {Array.isArray(prevList.certificateFileDTO) &&
              prevList.certificateFileDTO.length > 0 &&
              prevList.certificateFileDTO[index] ? (
                <td>
                  <label
                    htmlFor="cerFile"
                    style={{ paddingRight: 10, cursor: "pointer" }}
                  >
                    <i className="bx bx-up-arrow-alt" />
                    <input
                      type="file"
                      id="cerFile"
                      name="cerFile"
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
                    <input
                      type="file"
                      id="cerFile"
                      name="cerFile"
                      onClick={() => onClickCertificateFileUpload(index)}
                      onChange={(e) => CertificateFileChange(index, e)}
                      ref={cerFileInput}
                    />
                  </label>
                </td>
              )}
              {Array.isArray(prevList.certificateFileDTO) &&
              prevList.certificateFileDTO.length > 0 &&
              prevList.certificateFileDTO[index] ? (
                <td>
                  <button
                    className="bx bx-x"
                    name="btnX"
                    onClick={() => onClickCertificateFileDelete(index)}
                    style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                  />
                </td>
              ) : (
                <td>
                  <button
                    className="bx bx-x"
                    name="btnX"
                    style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                  />
                </td>
              )}
            </tr>
          ))
        : ""}
    </>
  );
}

export default SettingDocumentCertificate;
