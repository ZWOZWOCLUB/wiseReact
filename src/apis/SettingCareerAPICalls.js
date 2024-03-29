import {
  DELETE_CAREEAR,
  DELETE_CAREEAR_FILE,
} from "../modules/SettingCareearDeleteModule";
import {
  POST_CAREEAR,
  POST_CAREEAR_FILE,
} from "../modules/SettingCareearInsertModule";
import {
  PUT_CAREEAR,
  PUT_CAREEAR_FILE,
} from "../modules/SettingCareearUpdateModule";

//경력정보 등록
export const callCareerInsertAPI = ({ insertCrrForm }) => {
  console.log("callCareerInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/career`;
  console.log("insertCrrForm", insertCrrForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(insertCrrForm),
    }).then((response) => response.json());

    console.log("[callCareerInsertAPI] callCareerInsertAPI RESULT : ", result);
    if (result.status === 200) {
      dispatch({ type: POST_CAREEAR, payload: result });
      console.log({ result });
    }
  };
};

//경력정보 수정
export const callCareerUpdateAPI = ({ updateCrrForm }) => {
  console.log("callCareerUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/career`;
  console.log("updateCrrForm", updateCrrForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(updateCrrForm),
    }).then((response) => response.json());

    console.log("[callCareerUpdateAPI] callCareerUpdateAPI RESULT : ", result);
    if (result.status === 200) {
      dispatch({ type: PUT_CAREEAR, payload: result });
      console.log({ result });
    }
  };
};

//경력정보 삭제
export const callCareerDeleteAPI = ({ crrCode }) => {
  console.log("callCareerDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/career`;
  console.log("crrCode", crrCode);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ crrCode }),
    }).then((response) => response.json());

    console.log("[callCareerDeleteAPI] callCareerDeleteAPI RESULT : ", result);
    if (result.status === 200) {
      dispatch({ type: DELETE_CAREEAR, payload: result });
      console.log({ result });
    }
  };
};

//경력 파일 등록
export const calCareerFileInsertAPI = ({ formData }) => {
  console.log("calCareerFileInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/careerFile`;
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
      "[calCareerFileInsertAPI] calCareerFileInsertAPI RESULT : ",
      result
    );

    if (result.status === 200) {
      dispatch({ type: POST_CAREEAR_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
//경력 파일 수정
export const callCareerFileUpdateAPI = ({ formData }) => {
  console.log("callCareerFileUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/careerFile`;
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
      "[callCareerFileUpdateAPI] callCareerFileUpdateAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: PUT_CAREEAR_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
//경력 파일 삭제
export const callCareerFileDeleteAPI = ({ formData }) => {
  console.log("callCareerFileDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/careerFile`;
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
      "[callCareerFileDeleteAPI] callCareerFileDeleteAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: DELETE_CAREEAR_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
