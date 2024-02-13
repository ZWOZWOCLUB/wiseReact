import {
  POST_SALAY,
  PUT_SALAY,
  DELETE_SALAY,
  POST_SALAY_FILE,
  PUT_SALAY_FILE,
  DELETE_SALAY_FILE,
} from "../modules/SettingSalaryModule";

//통장정보 등록
export const callSalaryInsertAPI = ({ salForm }) => {
  console.log("callSalaryInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/salary`;
  console.log("salForm", salForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(salForm),
    }).then((response) => response.json());

    console.log(
      "[callSalaryInsertAPI] callSalaryInsertAPI RESULT : ",
      result
    );

    dispatch({ type: POST_SALAY, payload: result });
    console.log({ result });
  };
};

//통장정보 수정
export const callSalaryUpdateAPI = ({ salForm }) => {
  console.log("callSalaryUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/salary`;
  console.log("salForm", salForm);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(salForm),
    }).then((response) => response.json());

    console.log(
      "[callSalaryUpdateAPI] callSalaryUpdateAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: PUT_SALAY, payload: result });
      console.log({ result });
    }
  };
};

//통장 정보 삭제
export const callSalaryDeleteAPI = ({ salCode }) => {
  console.log("callSalaryDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/salary`;
  console.log("salCode", salCode);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({salCode}),
    }).then((response) => response.json());

    console.log(
      "[callSalaryDeleteAPI] callSalaryDeleteAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: DELETE_SALAY, payload: result });
      console.log({ result });
    }
  };
};

//통장 파일 등록
export const callSalaryFileInsertAPI = ({ formData }) => {
  console.log("callSalaryFileInsertAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/salaryFile`;
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
      "[callSalaryFileInsertAPI] callSalaryFileInsertAPI RESULT : ",
      result
    );

    if (result.status === 200) {
      dispatch({ type: POST_SALAY_FILE, payload: result.data });
      console.log({ result });
    }
  };
};
//통장 파일 수정
export const callSalaryFileUpdateAPI = ({ formData }) => {
  console.log("callSalaryFileUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/salaryFile`;
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
      "[callSalaryFileUpdateAPI] callSalaryFileUpdateAPI RESULT : ",
      result
    );

    if (result.status === 200) {
      dispatch({ type: PUT_SALAY_FILE, payload: result.data });
      console.log({ result });
    }
  };
};

//통장 파일 삭제
export const callSalaryFileDeleteAPI = ({ formData }) => {
  console.log("callSalaryFileDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/salaryFile`;
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
      "[callSalaryFileDeleteAPI] callSalaryFileDeleteAPI RESULT : ",
      result
    );

    if (result.status === 200) {
      dispatch({ type: DELETE_SALAY_FILE, payload: result.data });
      console.log({ result });
    }
  };
};