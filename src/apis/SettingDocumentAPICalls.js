import {
  POST_DOCUMENT_FILE,
  PUT_DOCUMENT_FILE,
  DELETE_DOCUMENT_FILE,
} from "../modules/SettingDocumentModule";

//자격 파일 등록
export const callDocumentFileInsertAPI = ({ formData }) => {
  console.log("callDocumentFileInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/documentFile`;
  console.log("formData", formData);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: formData,
    }).then((response) => response.json());

    console.log(
      "[callDocumentFileInsertAPI] callDocumentFileInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_DOCUMENT_FILE, payload: result.data });
    console.log({ result });
  };
};
//자격 파일 수정
export const callDocumentFileUpdateAPI = ({ formData }) => {
  console.log("callDocumentFileUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/documentFile`;
  console.log("formData", formData);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: formData,
    }).then((response) => response.json());

    console.log(
      "[callDocumentFileUpdateAPI] callDocumentFileUpdateAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_DOCUMENT_FILE, payload: result.data });
    console.log({ result });
  };
};
//자격 파일 삭제
export const callDocumentFileDeleteAPI = ({ formData }) => {
  console.log("callDocumentFileDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/documentFile`;
  console.log("formData", formData);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: formData,
    }).then((response) => response.json());

    console.log(
      "[callDocumentFileDeleteAPI] callDocumentFileDeleteAPI RESULT : ",
      result
    );

    dispatch({ type: DELETE_DOCUMENT_FILE, payload: result.data });
    console.log({ result });
  };
};