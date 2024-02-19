import { POST_PATTERN_INSERT } from "../modules/SchedulePatternInsertModule";

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
