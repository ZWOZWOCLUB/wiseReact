import { POST_SCHEDULE, GET_PATTERN_DAY } from "../modules/ScheduleModule";

//전체 스케줄 조회
export const callScheduleSearchAPI = ({ yearMonth }) => {
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
      body: JSON.stringify({ yearMonth }),
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

//패턴 조회
export const callSchedulePatternAndDaySearchAPI = () => {
  console.log("callSchedulePatternSearchAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/patternAndDaySearch`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[callSchedulePatternSearchAPI] callSchedulePatternSearchAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: GET_PATTERN_DAY, payload: result.data });
      console.log({ result });
    }
  };
};
