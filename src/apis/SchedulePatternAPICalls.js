import {
  GET_PATTERN,
  POST_PATTERN_INSERT,
} from "../modules/SchedulePatternModule";

//패턴만 조회
export const callSchedulePatternSearchAPI = () => {
  console.log("callSchedulePatternSearchAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/patternSearch`;
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
      dispatch({ type: GET_PATTERN, payload: result.data });
      console.log({ result });
    }
  };
};

//패턴 등록
export const callScheduleWorkPatternInsertAPI = ({ pattern }) => {
  console.log("callScheduleWorkPatternInsertAPI Call");
  console.log("callScheduleWorkPatternInsertAPI Call : ", pattern);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/workPattern`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        wokStartTime: pattern.wokStartTime,
        wokRestTime: pattern.wokRestTime,
        wokEndTime: pattern.wokEndTime,
        wokDeleteState: pattern.wokDeleteState,
        wokColor: pattern.wokColor,
        wokType: pattern.wokType,
      }),
    }).then((response) => response.json());

    console.log(
      "[callScheduleWorkPatternInsertAPI] callScheduleWorkPatternInsertAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: POST_PATTERN_INSERT, payload: result.data });
      console.log({ result });
    }
  };
};
