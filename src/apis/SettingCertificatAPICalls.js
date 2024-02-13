import {
  POST_CERTIFICATE,
  PUT_CERTIFICATE,  
  DELETE_CERTIFICATE,
  POST_CERTIFICATE_FILE,
  PUT_CERTIFICATE_FILE,
  DELETE_CERTIFICATE_FILE,
} from "../modules/SettingCertificateModule";


//자격정보 등록
export const callCertificateInsertAPI = ({ insertCerForm }) => {
  console.log("callCertificateInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificate`;
  console.log("insertCerForm", insertCerForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(insertCerForm),
    }).then((response) => response.json());

    console.log(
      "[callCertificateInsertAPI] callCertificateInsertAPI RESULT : ",
      result
    );
    if (result.status === 200) {

    dispatch({ type: POST_CERTIFICATE, payload: result });
    console.log({ result });
    }
  };
};

//자격정보 수정
export const callCertificateUpdateAPI = ({ updateCerForm }) => {
  console.log("callCertificateUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificate`;
  console.log("updateCerForm", updateCerForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(updateCerForm),
    }).then((response) => response.json());

    console.log(
      "[callCertificateUpdateAPI] callCertificateUpdateAPI RESULT : ",
      result
    );
    if (result.status === 200) {

    dispatch({ type: PUT_CERTIFICATE, payload: result });
    console.log({ result });
    }
  };
};

//경력정보 삭제
export const callCertificateDeleteAPI = ({ cerCode }) => {
  console.log("callCertificateDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/certificate`;
  console.log("cerCode", cerCode);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({cerCode}),
    }).then((response) => response.json());

    console.log(
      "[callCertificateDeleteAPI] callCertificateDeleteAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: DELETE_CERTIFICATE, payload: result });
      console.log({ result });
    }
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
    if (result.status === 200) {

    dispatch({ type: PUT_CERTIFICATE_FILE, payload: result.data });
    console.log({ result });
    }
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
    if (result.status === 200) {

    dispatch({ type: DELETE_CERTIFICATE_FILE, payload: result.data });
    console.log({ result });
    }
  };
};

