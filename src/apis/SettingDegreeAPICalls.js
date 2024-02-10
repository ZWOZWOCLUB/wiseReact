import {
  POST_DEGREE,
  PUT_DEGREE,
  POST_DEGREE_FILE,
  PUT_DEGREE_FILE,
} from "../modules/SettingDegreeModule";

//학위정보 등록
export const callDegreeInsertAPI = ({ degForm }) => {
  console.log("callDegreeInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degree`;
  console.log("degForm", degForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(degForm),
    }).then((response) => response.json());

    console.log(
      "[callDegreeInsertAPI] callDegreeInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_DEGREE, payload: result });
    console.log({ result });
  };
};

//학위정보 수정

export const callDegreeUpdateAPI = ({ updatedForm }) => {
  console.log("callDegreeInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degree`;
  console.log("updatedForm", updatedForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(updatedForm),
    }).then((response) => response.json());

    console.log(
      "[callDegreeInsertAPI] callDegreeInsertAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_DEGREE, payload: result });
    console.log({ result });
  };
};

//자격 파일 등록
export const callDegreeFileInsertAPI = ({ formData }) => {
  console.log("callDegreeFileInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degreeFile`;
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
      "[callDegreeFileInsertAPI] callDegreeFileInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_DEGREE_FILE, payload: result.data });
    console.log({ result });
  };
};
//자격 파일 수정
export const callDegreeFileUpdateAPI = ({ formData }) => {
  console.log("callDegreeFileUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degreeFile`;
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
      "[callDegreeFileUpdateAPI] callDegreeFileUpdateAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_DEGREE_FILE, payload: result.data });
    console.log({ result });
  };
};