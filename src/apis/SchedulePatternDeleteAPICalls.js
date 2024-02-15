import { PUT_PATTERN_DELETE } from "../modules/SchedulePatternDeleteModule";

//패턴 삭제
export const callScheduleWorkPatterDeleteAPI = ({ sendWokCode }) => {
  console.log("callScheduleWorkPatterDeleteAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/workPattern`;
  console.log("callScheduleWorkPatterDeleteAPI Call : ", sendWokCode);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ wokCode: sendWokCode, wokDeleteState: "Y" }),
    }).then((response) => response.json());

    console.log(
      "[callScheduleWorkPatternUpdateAPI] callScheduleWorkPatternUpdateAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: PUT_PATTERN_DELETE, payload: result });
      console.log({ result });
    }
  };
};
