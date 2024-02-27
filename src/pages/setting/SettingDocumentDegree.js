import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import {
  callDegreeFileDeleteAPI,
  callDegreeFileInsertAPI,
  callDegreeFileUpdateAPI,
} from "../../apis/SettingDegreeAPICalls";

function SettingDocumentDegree() {
  const dispatch = useDispatch();
  const [degFile, setDegFile] = useState(null);
  const degFileInput = useRef();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  // const [prevList, setPrevList] = useState();
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const result = useSelector((state) => state.settingDegreeInsertReducer);
  const result2 = useSelector((state) => state.settingDegreeUpdateReducer);
  const result3 = useSelector((state) => state.settingDegreeDeleteReducer);

  useEffect(
    (memCode) => {
      dispatch(
        callInfoSearchAPI({
          memCode: memberCode,
        })
      );
    },
    [result, result2, result3]
  );

  const onClickDegFileDown = async (index) => {
    try {
      const urlPath =
        "http://3.39.174.77:8001" +
        "/degree/" +
        prevList.degreeFileDTO[index].degAtcConvertName;
      console.log(urlPath);

      const response = await fetch(urlPath); //파일 경로 지정
      const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
      const link = document.createElement("a"); //a 요소 생성
      link.href = url; //url을 a태그의 href속성으로 지정
      link.setAttribute("download", prevList.degreeFileDTO[index].degAtcName); //다운로드 파일 이름 지정
      document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click(); //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link); //a요소 제거
    } catch (error) {
      console.log("등록된 파일이 없습니다");
    }
  };

  const DegreeFileUpload = async (degFile, index) => {
    console.log(degFile, "degFile555555555555555");
    console.log(index, "index555555555555555");

    if (
      prevList.degreeFileDTO &&
      prevList.degreeFileDTO.length > 0 &&
      prevList.degreeFileDTO[index]
    ) {
      console.log(index, "여기44444444444555555555555555");

      const formData = new FormData();
      formData.append("degreeFile", degFile);
      formData.append("degAtcCode", prevList.degreeFileDTO[index].degAtcCode);
      formData.append("degCode", prevList.degreeDTO[index].degCode);
      console.log(formData, "formData555555555555555");

      dispatch(callDegreeFileUpdateAPI({ formData }));
    } else {
      console.log(index, "여기555555555555555");
      console.log(prevList.degreeDTO[index].degCode, "여기555555555555555");
      console.log(degFile, "여기555555555555555");

      const formData = new FormData();
      formData.append("degreeFile", degFile);
      formData.append("degCode", prevList.degreeDTO[index].degCode);

      console.log(formData, "formData555555555555555");

      dispatch(callDegreeFileInsertAPI({ formData }));
    }
  };

  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickDegreeFileUpload = (index) => {
    console.log("클릭1");
    DegreeFileChange(index, {
      target: { files: degFileInput.current.files },
    });
  };

  // 파일 입력 변경 시 호출되는 함수
  const DegreeFileChange = (index, e) => {
    console.log("클릭2");

    if (e.target.files.length > 0) {
      console.log("클릭3");

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setDegFile(file);
      DegreeFileUpload(file, index); // 파일을 업로드합니다.
    }
  };

  //파일 삭제
  const onClickDegreeFileDelete = (index) => {
    console.log("클릭~~~~~~~", index);
    const formData = new FormData();
    formData.append("degAtcCode", prevList.degreeFileDTO[index].degAtcCode);
    dispatch(callDegreeFileDeleteAPI({ formData }));
  };

  return (
    <>
      {Array.isArray(prevList.degreeDTO) && prevList.degreeDTO.length > 0
        ? prevList.degreeDTO.map((deg, index) => (
            <tr style={{ textAlign: "left" }} className="List" key={index}>
              <td style={{ display: "none" }}>{deg.degCode}</td>
              <td>{deg.degName} </td>
              {Array.isArray(prevList.degreeFileDTO) &&
              prevList.degreeFileDTO.length > 0 &&
              prevList.degreeFileDTO[index] ? (
                <td>{prevList.degreeFileDTO[index].degAtcRegistDate}</td>
              ) : (
                <td style={{ color: "red" }}>-</td>
              )}
              {Array.isArray(prevList.degreeFileDTO) &&
              prevList.degreeFileDTO.length > 0 &&
              prevList.degreeFileDTO[index] ? (
                <td>{prevList.degreeFileDTO[index].degAtcName}</td>
              ) : (
                <td style={{ color: "#696cff", fontWeight: "700" }}>
                  파일을 등록해주세요
                </td>
              )}
              {Array.isArray(prevList.degreeFileDTO) &&
              prevList.degreeFileDTO.length > 0 &&
              prevList.degreeFileDTO[index] ? (
                <td>
                  <i
                    className="bx bx-down-arrow-alt"
                    onClick={() => onClickDegFileDown(index)}
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
              {Array.isArray(prevList.degreeFileDTO) &&
              prevList.degreeFileDTO.length > 0 &&
              prevList.degreeFileDTO[index] ? (
                <td>
                  <label
                    htmlFor="degFile"
                    style={{ paddingRight: 10, cursor: "pointer" }}
                  >
                    <i className="bx bx-up-arrow-alt" />
                    <input
                      type="file"
                      id="degFile"
                      name="degFile"
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
                    <input
                      type="file"
                      id="degFile"
                      name="degFile"
                      onClick={() => onClickDegreeFileUpload(index)}
                      onChange={(e) => DegreeFileChange(index, e)}
                      ref={degFileInput}
                    />
                  </label>
                </td>
              )}
              {Array.isArray(prevList.degreeFileDTO) &&
              prevList.degreeFileDTO.length > 0 &&
              prevList.degreeFileDTO[index] ? (
                <td>
                  <button
                    className="bx bx-x"
                    name="btnX"
                    onClick={() => {
                      onClickDegreeFileDelete(index);
                    }}
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

export default SettingDocumentDegree;
