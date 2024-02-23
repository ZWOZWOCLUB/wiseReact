import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import {
  callSalaryFileInsertAPI,
  callSalaryFileUpdateAPI,
  callSalaryFileDeleteAPI,
} from "../../apis/SettingSalAPICalls";

function SettingDocumentSalary() {
  const dispatch = useDispatch();
  const [salFile, setSalFile] = useState(null);
  const salFileInput = useRef();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  // const [prevList, setPrevList] = useState();
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const result = useSelector((state) => state.settingSalaryInsertReducer);
  const result2 = useSelector((state) => state.settingSalaryUpdateReducer);
  const result3 = useSelector((state) => state.settingSalaryDeleteReducer);

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
  const onClickSalFileDown = async () => {
    try {
      const urlPath =
        "http://localhost:8001" +
        "/salary/" +
        prevList.salaryFileDTO.salAtcConvertName;
      console.log(urlPath);

      const response = await fetch(urlPath); //파일 경로 지정
      console.log(response);

      const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
      console.log(url);

      const link = document.createElement("a"); //a 요소 생성
      console.log(link);

      link.href = url; //url을 a태그의 href속성으로 지정

      link.setAttribute("download", prevList.salaryFileDTO.salAtcName); //다운로드 파일 이름 지정
      document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click(); //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link); //a요소 제거
    } catch (error) {
      console.log("등록된 파일이 없습니다");
      // href="${ pageContext.servletContext.contextPath }/resources/upload/original/${ requestScope.thumbnail.attachmentList[0].savedName }" download>
    }
  };

  // 파일 업로드 함수
  const handleSalFileUpload = async (salaryFile) => {
    console.log(salaryFile, "salaryFile555555555555555");

    if (prevList.salaryFileDTO) {
      const formData = new FormData();
      formData.append("salaryFile", salaryFile);
      formData.append("salAtcCode", prevList.salaryFileDTO.salAtcCode);
      formData.append("salCode", prevList.salary.salCode);

      dispatch(callSalaryFileUpdateAPI({ formData }));
    } else {
      console.log(salaryFile, "salaryFile555555555555555");

      const formData = new FormData();
      formData.append("salaryFile", salaryFile);
      formData.append("salCode", prevList.salary.salCode);
      dispatch(callSalaryFileInsertAPI({ formData }));
    }
    window.location.reload();
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

  const onClickSalaryFileDelete = () => {
    if (prevList.salaryFileDTO) {
      console.log("클릭~~~~~~~");
      const formData = new FormData();
      formData.append("salAtcCode", prevList.salaryFileDTO.salAtcCode);
      dispatch(callSalaryFileDeleteAPI({ formData }));
    }
  };

  return (
    <>
      {prevList.salary ? (
        <tr
          style={{ textAlign: "left" }}
          className="List"
          key={
            prevList.salaryFileDTO
              ? prevList.salaryFileDTO.salAtcCode
              : prevList.salary.salCode
          }
        >
          <td>급여통장</td>
          <td>
            {prevList.salaryFileDTO
              ? prevList.salaryFileDTO.salAtcRegistDate
              : "-"}
          </td>
          <td>
            {prevList.salaryFileDTO
              ? prevList.salaryFileDTO.salAtcName
              : "증빙서류가 없습니다."}
          </td>
          <td>
            <i
              className="bx bx-down-arrow-alt"
              style={{ paddingRight: 10, cursor: "pointer" }}
              onClick={onClickSalFileDown}
            />
          </td>
          <td>
            <label
              htmlFor="salFile"
              style={{ paddingRight: 10, cursor: "pointer" }}
            >
              <i className="bx bx-up-arrow-alt" />
              <input
                type="file"
                id="salFile"
                name="salFile"
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
              onClick={onClickSalaryFileDelete}
              style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
            />
          </td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}

export default SettingDocumentSalary;
