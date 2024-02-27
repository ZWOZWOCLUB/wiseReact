import { POST_SCHEDULE } from "../modules/ScheduleModule";
import { GET_SCHEDUEL_TREE } from "../modules/ScheduleTreeModule";
import { GET_SCHEDUEL_UPDATE_TREE } from "../modules/ScheduleUpdateTreeModule";

//전체 스케줄 조회
export const callScheduleSearchAPI = ({ yearMonth, memberCode }) => {
  console.log("callScheduleSearchAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/searchMonth`;
  console.log("yearMonth", yearMonth);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ yearMonth, memberCode }),
    }).then((response) => response.json());

    console.log(
      "[callScheduleSearchAPI] callScheduleSearchAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: POST_SCHEDULE, payload: result.data });
      console.log({ result });
    }
  };
};

//트리 조회
export const callSchaduleTreeAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/treeView`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    if (result.status === 200) {
      console.log(
        "[OrganizationChartAPICalls] callOrganizationTreeAPI SUCCESS"
      );

      dispatch({ type: GET_SCHEDUEL_TREE, payload: result.data });

      console.log(result);
    }
  };
};

//수정에서 트리 조회
export const callSchaduleUpdateTreeAPI = ({ schCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/UpdateTreeView/${schCode}`;

  return async (dispatch) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json({ schCode }));

    if (result.status === 200) {
      console.log(
        "[OrganizationChartAPICalls] callOrganizationTreeAPI SUCCESS"
      );

      dispatch({ type: GET_SCHEDUEL_UPDATE_TREE, payload: result.data });

      console.log(result);
    }
  };
};
