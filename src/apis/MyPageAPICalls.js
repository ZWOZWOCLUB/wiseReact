import { GET_ATT_LIST } from "../modules/MPATTListModule";
import { GET_ATT } from "../modules/MPATTModule";
import { GET_CAREER } from "../modules/MPCareerModule";
import { GET_CER } from "../modules/MPCerModule";
import { GET_DEGREE } from "../modules/MPDegreeModule";
import { GET_DOC } from "../modules/MPDocModule";
import { GET_MEM } from "../modules/MPModule";
import { GET_PRO } from "../modules/MPProfileModule";
import { GET_SAL } from "../modules/MPSalaryModule";
import { GET_SIGN, PUT_SIGN } from "../modules/MPSignModule";
import { PUT_MEM } from "../modules/MPUpdateModule";
import { GET_VAC_HIS } from "../modules/MPVacHisModule";
import { GET_VAC } from "../modules/MPVacModule";

export const callMemberDetailAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchMem/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callMemberDetailAPI] callMemberDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callMemberDetailAPI] callMemberDetailAPI SUCCESS");
      dispatch({ type: GET_MEM, payload: result });
    }
  };
};

// 학위 상세 조회
export const callDegreeDetailAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchDegree/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callDegreeDetailAPI] callDegreeDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callDegreeDetailAPI] callDegreeDetailAPI SUCCESS");
      dispatch({ type: GET_DEGREE, payload: result });
    }
  };
};

// 자격증 상세 조회
export const callCerDetailAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchCer/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callCerDetailAPI] callCerDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callCerDetailAPI] callCerDetailAPI SUCCESS");
      dispatch({ type: GET_CER, payload: result });
    }
  };
};

// 경력 상세 조회
export const callCareerDetailAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchCareer/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callCareerDetailAPI] callCareerDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callCareerDetailAPI] callCareerDetailAPI SUCCESS");
      dispatch({ type: GET_CAREER, payload: result });
    }
  };
};

// 서류함 상세 조회
export const callDocAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/selectDoc/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callCareerDetailAPI] callCareerDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callCareerDetailAPI] callCareerDetailAPI SUCCESS");
      dispatch({ type: GET_DOC, payload: result });
    }
  };
};

// 출퇴근 상세 조회
export const callATTAPI = ({ memCode, date }) => {
  console.log("api memCode", memCode);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/attendance/${memCode}/${date}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callATTAPI] callATTAPI RESULT : ", result);
      console.log("[callATTAPI] callATTAPI SUCCESS");
      dispatch({ type: GET_ATT, payload: result });
  };
};

// 소유/소멸연차 상세 조회
export const callVacAPI = ({ memCode }) => {
  console.log("api memCode", memCode);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/ownAnnual/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callVacAPI] callVacAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callVacAPI] callVacAPI SUCCESS");
      dispatch({ type: GET_VAC, payload: result });
    }
  };
};

// 사용 연차 상세 조회
export const callVacHisAPI = ({ memCode, year }) => {
  console.log("api memCode", memCode);
  console.log("api year", year);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/annualHistory/${memCode}/${year}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callVacHisAPI] callVacHisAPI RESULT : ", result);
      console.log("[callVacHisAPI] callVacHisAPI SUCCESS");
      dispatch({ type: GET_VAC_HIS, payload: result });
  };
};

// 회원 정보 업데이트
export const callMemberUpdateAPI = ({ form }) => {
  console.log("[callMemberUpdateAPI] callMemberUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/updateMem`;

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

    dispatch({ type: PUT_MEM, payload: result });
  };
};

// 비밀번호 정보 업데이트
export const callPassUpdateAPI = ({ form }) => {
    console.log("[callPassUpdateAPI] callPassUpdateAPI Call");
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/updatePass`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
        body: form,
      }).then((response) => response.json());
  
      console.log("[callPassUpdateAPI] callPassUpdateAPI RESULT : ", result);
  
      dispatch({ type: PUT_MEM, payload: result });
      
    };
  };

  // 서명 입력
export const callSignInsertAPI = ({ form }) => {
    console.log('form---->',form);
    console.log("[callSignInsertAPI] callSignInsertAPI Call");
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/insertSign`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        
        },
        body: form,
      }).then((response) => response.json());
  
      console.log("[callSignInsertAPI] callSignInsertAPI RESULT : ", result);
  
      dispatch({ type: PUT_MEM, payload: result });
      
    };
  };

//   서명 조회
  export const callSignAPI = ({ memCode }) => {
    console.log("api memCode", memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/selectSign/${memCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());
  
      console.log("[callSignAPI] callSignAPI RESULT : ", result);
        console.log("[callSignAPI] callSignAPI SUCCESS");
        dispatch({ type: GET_MEM, payload: result });
    };
  };

    // 서명 수정
export const callSignUpdateAPI = ({ form }) => {
  console.log('form---->',form);
  console.log("[callSignUpdateAPI] callSignUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/updateSign`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      
      },
      body: form,
    }).then((response) => response.json());

    console.log("[callSignUpdateAPI] callSignUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_SIGN, payload: result });
    
  };
};

//   프로필 조회
export const callProfileAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/selectProfile/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callProfileAPI] callProfileAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callProfileAPI] callProfileAPI SUCCESS");
      dispatch({ type: GET_PRO, payload: result });
    }
  };
};

//  서명 조회 (GET_MEM 리듀서랑 같은 화면에서 봐야해서 다른 리듀서로 하나 더 만듬)
export const callMainSignAPI = ({ memCode }) => {
  console.log("api memCode", memCode);
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/selectSign/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callMainSignAPI] callMainSignAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callMainSignAPI] callMainSignAPI SUCCESS");
      dispatch({ type: GET_SIGN, payload: result });
    }
  };
};

//  통장사본조회
export const callSalAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/selectSal/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callSalAPI] callSalAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callSalAPI] callSalAPI SUCCESS");
      dispatch({ type: GET_SAL, payload: result });
    }
  };
};

// 출퇴근 리스트 상세조회
export const callATTListAPI = ({ memCode }) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/attList/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callATTListAPI] callATTListAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callATTListAPI] callATTListAPI SUCCESS");
      dispatch({ type: GET_ATT_LIST, payload: result });
    }
  };
};

// // 공휴일 조회
// export const callHolidayAPI = () => {

//   const requestURL = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=fC3o1F%2F7ZWMRqCqStgU5PKqw%2FXpDjMJMzHdnXtA4Mr6fvjiPYq%2FblEBzExy3OqB6rcsO7DAwlvJ663cW02qQ%2Fg%3D%3D&solYear=2015&solMonth=09`;

//   return async (dispatch, getState) => {
//     const result = await fetch(requestURL, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//         Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
//       },
//     }).then((response) => response.json());

//     console.log("[callATTListAPI] callATTListAPI RESULT : ", result);
//     if (result.status === 200) {
//       console.log("[callATTListAPI] callATTListAPI SUCCESS");
//       dispatch({ type: GET_SIGN, payload: result });
//     }
//   };
// };