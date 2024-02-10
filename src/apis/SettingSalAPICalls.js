import { POST_SALAY_FILE, PUT_SALAY_FILE } from "../modules/SettingSalaryModule";

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

    dispatch({ type: POST_SALAY_FILE, payload: result.data });
    console.log({ result });
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

    dispatch({ type: PUT_SALAY_FILE, payload: result.data });
    console.log({ result });
  };
};