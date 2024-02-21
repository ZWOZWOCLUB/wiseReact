import { POST_SCHEDULE_MEMBER_INSERT } from "../modules/ScheduleInsertMemModule";

//스케줄에 사람 등록
export const callScheduleMemInsertAPI = ({ checked }) => {
  console.log("callScheduleMemInsertAPI Call");
  console.log("callScheduleMemInsertAPI Call : ", checked);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/allowance`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: checked,
    }).then((response) => response.json());

    console.log(
      "[callScheduleMemInsertAPI] callScheduleMemInsertAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: POST_SCHEDULE_MEMBER_INSERT, payload: result.data });
      console.log({ result });
    }
  };
};
