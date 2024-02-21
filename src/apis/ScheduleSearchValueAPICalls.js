import { POST_SEARCH_DAY } from "../modules/ScheduleSearchValueModule";

export const callScheduleSearcValueAPI = ({ yearMonth }) => {
  console.log("callScheduleSearcValuehAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/searchDay`;
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
      "[callScheduleSearcValuehAPI] callScheduleSearcValuehAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: POST_SEARCH_DAY, payload: result.data });
      console.log({ result });
    }
  };
};

