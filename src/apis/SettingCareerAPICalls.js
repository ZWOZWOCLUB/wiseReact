import {
  POST_CAREEAR,
  POST_CAREEAR_FILE,
  PUT_CAREEAR_FILE,
  DELETE_CAREEAR_FILE
} from '../modules/SettingCareearModule';



//경력정보 등록
export const callCareerInsertAPI = ({ crrForm }) => {
  console.log("callCareerInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/career`;
  console.log("crrForm", crrForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(crrForm),
    }).then((response) => response.json());

    console.log(
      "[callCareerInsertAPI] callCareerInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_CAREEAR, payload: result });
    console.log({ result });
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

    dispatch({ type: POST_CAREEAR_FILE, payload: result.data });
    console.log({ result });
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

    dispatch({ type: PUT_CAREEAR_FILE, payload: result.data });
    console.log({ result });
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

    dispatch({ type: DELETE_CAREEAR_FILE, payload: result.data });
    console.log({ result });
  };
};
