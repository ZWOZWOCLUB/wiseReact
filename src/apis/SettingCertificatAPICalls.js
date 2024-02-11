import {
  POST_CERTIFICATE,
  POST_CERTIFICATE_FILE,
  PUT_CERTIFICATE_FILE,
  DELETE_CERTIFICATE_FILE,
} from "../modules/SettingCertificateModule";


//자격정보 등록
export const callCertificateInsertAPI = ({ formData }) => {
  console.log("callCertificateInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificate`;
  console.log("formData", formData);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json());

    console.log(
      "[callCertificateInsertAPI] callCertificateInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_CERTIFICATE, payload: result });
    console.log({ result });
  };
};
//자격 파일 등록
export const callCertificateFileInsertAPI = ({ formData }) => {
  console.log("callCertificateFileInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificateFile`;
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
      "[callCertificateFileInsertAPI] callCertificateFileInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_CERTIFICATE_FILE, payload: result.data });
    console.log({ result });
  };
};
//자격 파일 수정
export const callCertificateFileUpdateAPI = ({ formData }) => {
  console.log("callCertificateFileUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificateFile`;
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
      "[callCertificateFileUpdateAPI] callCertificateFileUpdateAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_CERTIFICATE_FILE, payload: result.data });
    console.log({ result });
  };
};

//자격 파일 삭제
export const callCertificateFileDELETEAPI = ({ formData }) => {
  console.log("callCertificateFileDELETEAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificateFile`;
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
      "[callCertificateFileDELETEAPI] callCertificateFileDELETEAPI RESULT : ",
      result
    );

    dispatch({ type: DELETE_CERTIFICATE_FILE, payload: result.data });
    console.log({ result });
  };
};

