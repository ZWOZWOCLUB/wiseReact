import { PUT_PATTERN_UPDATE } from "../modules/SchedulePatternUpdateModule";

//패턴 삭제
export const callScheduleWorkPatternUpdateAPI = ({ pattern }) => {
  console.log("callScheduleWorkPatternUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/workPattern`;
  console.log("callScheduleWorkPatternUpdateAPI Call : ", pattern);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        wokCode: pattern.wokCode,
        wokStartTime: pattern.wokStartTime,
        wokRestTime: pattern.wokRestTime,
        wokEndTime: pattern.wokEndTime,
        wokDeleteState: pattern.wokDeleteState,
        wokColor: pattern.wokColor,
        wokType: pattern.wokType,
      }),
    }).then((response) => response.json());

    console.log(
      "[callScheduleWorkPatternUpdateAPI] callScheduleWorkPatternUpdateAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: PUT_PATTERN_UPDATE, payload: result.data });
      console.log({ result });
    }
  };
};
