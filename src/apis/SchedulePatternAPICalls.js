import { GET_PATTERN } from "../modules/SchedulePatternModule";

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
