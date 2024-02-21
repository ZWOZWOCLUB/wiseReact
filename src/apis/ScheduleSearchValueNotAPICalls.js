import { POST_SEARCH_NOTCONTAIN_DAY } from "../modules/ScheduleSearchValueNotModule";

export const callScheduleSearcValueNotAPI = ({ notContain }) => {
  console.log("callScheduleSearcValuehAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/notContain`;
  console.log("notContain", notContain);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ notContain }),
    }).then((response) => response.json());

    console.log(
      "[callScheduleSearcValuehAPI] callScheduleSearcValuehAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: POST_SEARCH_NOTCONTAIN_DAY, payload: result.data });
      console.log({ result });
    }
  };
};

