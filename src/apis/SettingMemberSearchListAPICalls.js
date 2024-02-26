import { GET_SEARCH_MEMLIST } from "../modules/SettingSearchMemListModule";

//회원 키워드로 조회
export const callSearchMemListAPI = ({ search }) => {
  console.log("[callSearchMemListAPI] callSearchMemListAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/search?s=${search}`;

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
      "[callSearchMemListAPI] callSearchMemListAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[callSearchMemListAPI] callSearchMemListAPI SUCCESS");
      dispatch({ type: GET_SEARCH_MEMLIST, payload: result.data });
    }
  };
};
