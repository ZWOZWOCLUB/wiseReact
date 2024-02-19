import {
  POST_MEMBERADD,
  PUT_MEMBERADD,
  PUT_MEMBER_VACATION,
} from "../modules/SettingMemberModule.js";

//회원 등록
export const callMemberAddAPI = ({ form }) => {
  console.log("callMemberAddAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/member`;
  console.log("formData", form);
  // console.log('profile', profile);
  console.log("----------", window.localStorage.getItem("accessToken"));
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },

      body: form,
    }).then((response) => response.json());

    console.log("[callMemberAddAPI] callMemberAddAPI RESULT : ", result);
    if (result.status === 200) {
      dispatch({ type: POST_MEMBERADD, payload: result.data });
      console.log({ result });
      alert("직원등록이 완료되었습니다.");
    } else {
      alert("직원등록이 실패하였습니다.");
    }
  };
};

//회원 수정

export const callMemberUpdateAPI = ({ form }) => {
  console.log("callMemberUpdateAPI Call");
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/member`;
  console.log("formData", form);
  // console.log('profile', profile);
  console.log("----------", window.localStorage.getItem("accessToken"));
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },

      body: form,
    }).then((response) => response.json());

    console.log("[callMemberUpdateAPI] callMemberUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_MEMBERADD, payload: result.data });
    console.log({ result });
  };
};

//연차 수정

export const callMemberVacationAPI = ({ memCode, vctCount }) => {
  console.log("callMemberVacationAPI Call");
  console.log("memCode Call", memCode);
  console.log("vctCount Call", vctCount);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/updateVacation`;
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ memCode, vctCount }),
    }).then((response) => response.json());

    console.log(
      "[callMemberVacationAPI] callMemberVacationAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      dispatch({ type: PUT_MEMBER_VACATION, payload: result.data });
      console.log({ result });
    }
  };
};
