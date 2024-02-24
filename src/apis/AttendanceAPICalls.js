import {
  POST_ATTENDANCE_START,
  PUT_ATTENDANCE_END,
  PUT_RECOVERY_ROLE,
} from "../modules/AttendanceMoudle";
import { POST_SEARCH_PROXY } from "../modules/SearchProxyModule";

export const attendanceStartAPICalls = ({ start }) => {
  console.log("on", start);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/on`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(start),
    }).then((response) => response.json());
    console.log("on result", result);

    dispatch({ type: POST_ATTENDANCE_START, payload: result });
  };
};

export const attendanceEndAPICalls = ({ start }) => {
  console.log("off", start);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/off`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(start),
    }).then((response) => response.json());
    console.log("off result", result);

    dispatch({ type: PUT_ATTENDANCE_END, payload: result });
  };
};

export const searchProxyAPICalls = ({ start }) => {
  console.log("searchProxyAPICalls", start);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/findProxyApprover`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(start),
    }).then((response) => response.json());
    console.log("searchProxyAPICalls result", result);

    dispatch({ type: POST_SEARCH_PROXY, payload: result });
  };
};

export const recoveryRoleAPICalls = ({ requestBody }) => {
  console.log("recoveryRoleAPICalls", requestBody);
  console.log("recoveryRoleAPICalls", requestBody);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/rolerecovery`;
  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: requestBody,
    }).then((response) => response.json());

    if (result.status === 200) {
      dispatch({ type: PUT_RECOVERY_ROLE, payload: result.data });
    }
    console.log("dateSearchAPICalls result", result);
  };
};
