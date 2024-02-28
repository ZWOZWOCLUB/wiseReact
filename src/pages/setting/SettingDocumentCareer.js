import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import {
  calCareerFileInsertAPI,
  callCareerFileDeleteAPI,
  callCareerFileUpdateAPI,
} from "../../apis/SettingCareerAPICalls";

function SettingDocumentCareer() {
  const dispatch = useDispatch();
  const [crrFile, setCrrFile] = useState(null);
  const crrFileInput = useRef();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  // const [prevList, setPrevList] = useState();
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const result = useSelector((state) => state.settingCareerInsertReducer);
  const result2 = useSelector((state) => state.settingCareerUpdateReducer);
  const result3 = useSelector((state) => state.settingCareerDeleteReducer);

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

  //파일 다운하는 함수
  const onClickCrrFileDown = async (index) => {
    try {
      const urlPath =
        "http://3.39.174.77/:8001" +
        "/career/" +
        prevList.careerFileDTO[index].crrAtcConvertName;
      console.log(urlPath);

      const response = await fetch(urlPath); //파일 경로 지정
      const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
      const link = document.createElement("a"); //a 요소 생성
      link.href = url; //url을 a태그의 href속성으로 지정
      link.setAttribute("download", prevList.careerFileDTO[index].crrAtcName); //다운로드 파일 이름 지정
      document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click(); //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link); //a요소 제거
    } catch (error) {
      console.log("등록된 파일이 없습니다");
    }
  };

  const CareerFileUpload = async (crrFile, index) => {
    console.log(crrFile, "crrFile555555555555555");
    console.log(index, "index555555555555555");

    if (prevList.careerFileDTO.length > 0 && prevList.careerFileDTO[index]) {
      console.log(index, "여기44444444444555555555555555");

      const formData = new FormData();
      formData.append("careerFile", crrFile);
      formData.append("crrAtcCode", prevList.careerFileDTO[index].crrAtcCode);
      formData.append("crrCode", prevList.careerDTO[index].crrCode);
      console.log(formData, "formData555555555555555");

      dispatch(callCareerFileUpdateAPI({ formData }));
    } else {
      console.log(index, "여기555555555555555");
      console.log(prevList.careerDTO[index].crrCode, "여기555555555555555");
      console.log(crrFile, "여기555555555555555");

      const formData = new FormData();
      formData.append("careerFile", crrFile);
      formData.append("crrCode", prevList.careerDTO[index].crrCode);

      console.log(formData, "formData555555555555555");

      dispatch(calCareerFileInsertAPI({ formData }));
    }
  };

  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickCareerFileUpload = (index) => {
    console.log("클릭1");
    CareerFileChange(index, { target: { files: crrFileInput.current.files } });
  };

  // 파일 입력 변경 시 호출되는 함수
  const CareerFileChange = (index, e) => {
    console.log("클릭2");

    if (e.target.files.length > 0) {
      console.log("클릭3");

      const file = e.target.files[0];
      setCrrFile(file);
      CareerFileUpload(file, index);
    }
  };

  //파일 삭제
  const onClickCareerFileDelete = (index) => {
    console.log("클릭~~~~~~~", index);
    const formData = new FormData();
    formData.append("crrAtcCode", prevList.careerFileDTO[index].crrAtcCode);
    dispatch(callCareerFileDeleteAPI({ formData }));
    window.location.reload();
  };

  return (
    <>
      {Array.isArray(prevList.careerDTO) && prevList.careerDTO.length > 0
        ? prevList.careerDTO.map((crr, index) => (
            <tr style={{ textAlign: "left" }} className="List" key={index}>
              <td style={{ display: "none" }}>{crr.crrCode}</td>
              <td>{crr.crrName} 경력증명서</td>
              {Array.isArray(prevList.careerFileDTO) &&
              prevList.careerFileDTO.length > 0 &&
              prevList.careerFileDTO[index] ? (
                <td>{prevList.careerFileDTO[index].crrAtcRegistDate}</td>
              ) : (
                <td>-</td>
              )}
              {Array.isArray(prevList.careerFileDTO) &&
              prevList.careerFileDTO.length > 0 &&
              prevList.careerFileDTO[index] ? (
                <td>{prevList.careerFileDTO[index].crrAtcName}</td>
              ) : (
                <td style={{ color: "#696cff", fontWeight: "700" }}>
                  파일을 등록해주세요
                </td>
              )}
              {Array.isArray(prevList.careerFileDTO) &&
              prevList.careerFileDTO.length > 0 &&
              prevList.careerFileDTO[index] ? (
                <td>
                  <i
                    className="bx bx-down-arrow-alt"
                    style={{ cursor: "pointer" }}
                    onClick={() => onClickCrrFileDown(index)}
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
              {Array.isArray(prevList.careerFileDTO) &&
              prevList.careerFileDTO.length > 0 &&
              prevList.careerFileDTO[index] ? (
                <td>
                  <label
                    htmlFor="crrFile"
                    style={{ paddingRight: 10, cursor: "pointer" }}
                  >
                    <i className="bx bx-up-arrow-alt" />
                    <input
                      type="file"
                      id="crrFile"
                      name="crrFile"
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
                    <input
                      type="file"
                      id="crrFile"
                      name="crrFile"
                      onClick={() => onClickCareerFileUpload(index)}
                      onChange={(e) => CareerFileChange(index, e)}
                      ref={crrFileInput}
                    />
                  </label>
                </td>
              )}
              {Array.isArray(prevList.careerFileDTO) &&
              prevList.careerFileDTO.length > 0 &&
              prevList.careerFileDTO[index] ? (
                <td>
                  <button
                    className="bx bx-x"
                    name="btnX"
                    onClick={() => onClickCareerFileDelete(index)}
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

export default SettingDocumentCareer;
