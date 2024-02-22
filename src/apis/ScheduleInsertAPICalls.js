import { POST_SCHEDUEL_INSERT } from "../modules/ScheduleInsertModule";

//스케줄 등록
export const callScheduleInsertAPI = ({ scheduleForm }) => {
  console.log("callScheduleInsertAPI Call");
  console.log("callScheduleInsertAPI Call : ", scheduleForm);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/schedule`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: scheduleForm,
    }).then((response) => response.json());

    console.log(
      "[callScheduleInsertAPI] callScheduleInsertAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: POST_SCHEDUEL_INSERT, payload: result.data });
      console.log({ result });
    }
  };
};
