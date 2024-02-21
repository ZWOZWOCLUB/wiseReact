import { GET_SEARCH_ETC } from "../modules/ScheduleSearchETCModule";

export const callScheduleSearETCAPI = () => {
  console.log("callScheduleSearETCAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/schedule/etcPattern`;
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
      "[callScheduleSearETCAPI] callScheduleSearETCAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: GET_SEARCH_ETC, payload: result.data });
      console.log({ result });
    }
  };
};
