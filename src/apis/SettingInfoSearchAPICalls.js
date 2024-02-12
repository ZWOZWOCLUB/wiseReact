import {
  GET_INFO_SEARCH,
} from "../modules/SettingInfoSearchModuel";

//정보 조회
export const callInfoSearchAPI = ({ memCode }) => {
  console.log("callInfoSearchAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/searchResourcesInformation/${memCode}`;
  console.log("memCode", memCode);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log(
        "[callInfoSearchAPI] callInfoSearchAPI RESULT : ",
        result
      );

      dispatch({ type: GET_INFO_SEARCH, payload: result.data });
      console.log({ result });
    };
  }
};
