import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callInfoSearchAPI } from "../../apis/SettingInfoSearchAPICalls";
import {
  callDocumentFileDeleteAPI,
  callDocumentFileUpdateAPI,
} from "../../apis/SettingDocumentAPICalls";

function SettingDocumentETC() {
  const dispatch = useDispatch();
  const [docFile, setDocFile] = useState(null);
  const docFileInput = useRef();
  const [searchParams] = useSearchParams();
  const memberCode = searchParams.get("memCode");
  // const [prevList, setPrevList] = useState();
  const prevList = useSelector((state) => state.settingInfoSearchReducer);
  const result = useSelector((state) => state.settingDocumentInsertReducer);
  const result2 = useSelector((state) => state.settingDocumentUpdateReducer);
  const result3 = useSelector((state) => state.settingDocumentDeleteReducer);
  const [updateState, setUpdateState] = useState(false);
  const [updatedForms, setUpdatedForms] = useState([]);

  const [form, setForm] = useState([
    {
      memCode: memberCode,
      docAtcKind: "",
      docAtcCode: 0,
    },
  ]);

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

  const onChangeHandler = (index, e) => {
    setUpdateState(true);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    const { name, value } = e.target;
    const updatedForms = [...form];
    updatedForms[index] = {
      ...updatedForms[index],
      memCode: memberCode,
      docAtcCode: prevList.documentFileDTO[index].docAtcCode,
      [name]: value,
    };
    setForm(updatedForms);
    console.log(updatedForms, ";;;;;;;;;;;;;;;;;;;;");
  };

  const onClickDocFileDown = async (index) => {
    try {
      const urlPath =
        "http://3.39.174.77:8001" +
        "/etcDocumentFile/" +
        prevList.documentFileDTO[index].docAtcConvertName;
      console.log(urlPath);

      const response = await fetch(urlPath); //파일 경로 지정
      const blob = await response.blob(); //파일 경로를 Blob 객체로 변환 Blob는 바이너리 데이터를 나타내는 객체임
      console.log("blobs", blob);

      const url = window.URL.createObjectURL(new Blob([blob])); //다운로드 링크 생성
      const link = document.createElement("a"); //a 요소 생성
      link.href = url; //url을 a태그의 href속성으로 지정
      link.setAttribute(
        "download",
        prevList.documentFileDTO[index].docAtcOriginName
      ); //다운로드 파일 이름 지정
      document.body.appendChild(link); //a요소 body에 추가 보이지 않지만 클릭 가능한 링크 생성
      link.click(); //생성한 링크 클릭해서 파일 다운
      link.parentNode.removeChild(link); //a요소 제거
    } catch (error) {
      console.log("등록된 파일이 없습니다");
    }
  };

  const DocumentFileUpload = async (file, index) => {
    if (form && form[index] && form[index].docAtcKind) {
      const formData = new FormData();
      formData.append("etcFile", file);
      formData.append("docAtcCode", prevList.documentFileDTO[index].docAtcCode);
      formData.append("docAtcKind", form[index].docAtcKind);
      formData.append("docCode", prevList.documentFileDTO[index].docCode);
      console.log(formData, "formData555555555555555");

      dispatch(callDocumentFileUpdateAPI({ formData }));
    } else {
      const formData = new FormData();
      formData.append("etcFile", file);
      formData.append("docAtcCode", prevList.documentFileDTO[index].docAtcCode);
      formData.append("docAtcKind", prevList.documentFileDTO[index].docAtcKind);
      formData.append("docCode", prevList.documentFileDTO[index].docCode);
      console.log(formData, "formData555555555555555");

      dispatch(callDocumentFileUpdateAPI({ formData }));
    }
  };

  const onEnterKeyHandler = (index, e) => {
    if (form && form[index] && form[index].docAtcKind) {
      console.log("Enter key", index);
      const formData = new FormData();
      formData.append("docAtcKind", form[index].docAtcKind);
      formData.append("docAtcCode", prevList.documentFileDTO[index].docAtcCode);

      console.log(formData, "formData555555555555555");

      dispatch(callDocumentFileUpdateAPI({ formData }));
    }
  };

  // 파일 업로드 버튼 클릭 시 호출되는 함수
  const onClickDocumentFileUpload = (index) => {
    console.log("클릭1", index);
    DocumentFileChange(index, {
      target: { files: docFileInput.current.files },
    });
  };

  // 파일 입력 변경 시 호출되는 함수
  const DocumentFileChange = (index, e) => {
    console.log("클릭2");

    if (e.target.files.length > 0) {
      console.log("클릭3");

      const file = e.target.files[0]; // 변경된 파일은 배열의 첫 번째 요소입니다.
      setDocFile(file);
      DocumentFileUpload(file, index); // 파일을 업로드합니다.
    }
  };

  //파일 삭제
  const onClickDocumentFileDelete = (index) => {
    console.log("클릭~~~~~~~", index);
    const formData = new FormData();
    formData.append("docAtcCode", prevList.documentFileDTO[index].docAtcCode);
    dispatch(callDocumentFileDeleteAPI({ formData }));
  };

  return (
    <>
      {Array.isArray(prevList.documentFileDTO) &&
      prevList.documentFileDTO.length > 0
        ? prevList.documentFileDTO.map((doc, index) => (
            <tr style={{ textAlign: "left" }} className="List" key={index}>
              <td style={{ display: "none" }}>{doc.docAtcCode}</td>
              <td>
                <input
                  type="text"
                  value={!updateState ? doc.docAtcKind : form.docAtcKind}
                  onChange={(e) => onChangeHandler(index, e)}
                  onKeyUp={(e) => onEnterKeyHandler(index, e)}
                  name="docAtcKind"
                />
              </td>
              <td>{doc.docAtcRegistDate}</td>
              <td>{doc.docAtcOriginName}</td>
              <td>
                <i
                  className="bx bx-down-arrow-alt"
                  style={{ cursor: "pointer" }}
                  onClick={() => onClickDocFileDown(index)}
                />
              </td>
              <td>
                <label
                  htmlFor="docFile"
                  style={{ paddingRight: 10, cursor: "pointer" }}
                >
                  <i className="bx bx-up-arrow-alt" />
                  <input
                    type="file"
                    id="docFile"
                    name="docFile"
                    onClick={() => onClickDocumentFileUpload(index)}
                    onChange={(e) => DocumentFileChange(index, e)}
                    ref={docFileInput}
                  />
                </label>
              </td>
              <td>
                <button
                  className="bx bx-x"
                  name="btnX"
                  onClick={() => onClickDocumentFileDelete(index)}
                  style={{ border: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                />
              </td>
            </tr>
          ))
        : ""}
    </>
  );
}

export default SettingDocumentETC;
