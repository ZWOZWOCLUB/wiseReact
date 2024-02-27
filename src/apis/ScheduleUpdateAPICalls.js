import { PUT_SCHEDULE } from "../modules/ScheduleUpdateModule";

//스케줄에 사람 등록
export const callScheduleUpdateAPI = ({ form }) => {
  console.log("callScheduleUpdateAPI Call");
  console.log("callScheduleUpdateAPI Call : ", form);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/schedule`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    console.log(
      "[callScheduleUpdateAPI] callScheduleUpdateAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: PUT_SCHEDULE, payload: result });
      console.log({ result });
    } else {
      alert("근무 기록이 있어 수정 불가능합니다.");
      window.location.reload();
    }
  };
};
