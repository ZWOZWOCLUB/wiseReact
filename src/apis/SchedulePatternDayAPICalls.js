import { GET_PATTERN_DAY } from "../modules/SchedulePatternDayModule";

//패턴 조회
export const callSchedulePatternAndDaySearchAPI = () => {
  console.log("callSchedulePatternSearchAPI Call.0000000000000000000");
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
