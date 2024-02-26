import {
  POST_DEGREE,
  POST_DEGREE_FILE,
} from "../modules/SettingDegreeInsertModule";
import {
  PUT_DEGREE,
  PUT_DEGREE_FILE,
} from "../modules/SettingDegreeUpdateModule";
import {
  DELETE_DEGREE,
  DELETE_DEGREE_FILE,
} from "../modules/SettingDegreeDeleteModule";

//학위정보 등록
export const callDegreeInsertAPI = ({ insertDegForm }) => {
  console.log("callDegreeInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degree`;
  console.log("insertDegForm", insertDegForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(insertDegForm),
    }).then((response) => response.json());

    console.log("[callDegreeInsertAPI] callDegreeInsertAPI RESULT : ", result);

    dispatch({ type: POST_DEGREE, payload: result });
    console.log({ result });
  };
};

//학위정보 수정
export const callDegreeUpdateAPI = ({ updateDegForm }) => {
  console.log("callDegreeUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degree`;
  console.log("updateDegForm", updateDegForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(updateDegForm),
    }).then((response) => response.json());

    console.log("[callDegreeUpdateAPI] callDegreeUpdateAPI RESULT : ", result);
    if (result.status === 200) {
      dispatch({ type: PUT_DEGREE, payload: result });
      console.log({ result });
    }
  };
};

//학위정보 삭제
export const callDegreeDeleteAPI = ({ degCode }) => {
  console.log("callDegreeDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degree`;
  console.log("degCode", degCode);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ degCode }),
    }).then((response) => response.json());

    console.log("[callDegreeDeleteAPI] callDegreeDeleteAPI RESULT : ", result);
    if (result.status === 200) {
      dispatch({ type: DELETE_DEGREE, payload: result });
      console.log({ result });
    }
  };
};

//학위 파일 등록
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
    if (result.status === 200) {
      dispatch({ type: POST_DEGREE_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
//학위 파일 수정
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
    if (result.status === 200) {
      dispatch({ type: PUT_DEGREE_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
//학위 파일 삭제
export const callDegreeFileDeleteAPI = ({ formData }) => {
  console.log("callDegreeFileDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/degreeFile`;
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
      "[callDegreeFileDeleteAPI] callDegreeFileDeleteAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: DELETE_DEGREE_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
