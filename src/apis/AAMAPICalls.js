import { GET_ALLALARM } from "../modules/AAMAllAlarmModule";
import { GET_APP } from "../modules/AAMApprovalModule";
import { GET_FIRST_NOTICE } from "../modules/AAMFirstNoticeModule";
import { GET_FIRST_REC } from "../modules/AAMFirstRecModule";
import { GET_FIRST_SEND } from "../modules/AAMFirstSendModule";
import { PUT_MSG_CHECK } from "../modules/AAMModule";
import { GET_PERALARM } from "../modules/AAMPerAlarmModule";
import { PUT_ALARM_CHECK } from "../modules/AAMPutAlarmModule";
import { GET_REC_MESSAGE } from "../modules/AAMRecMessageModule";
import { POST_REC_MESSAGE } from "../modules/AAMRecNewMsgModule";
import { GET_REFERENCE } from "../modules/AAMReferencerModule";
import { GET_SEND_MESSAGE } from "../modules/AAMSendMessageModule";
import { POST_MESSAGE } from "../modules/AAMSendNewMsgModule";


// 개인 알람 조회
export const callPerAlarmDetailAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/perAlarm/${memCode}`;

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
      "[callPerAlarmDetailAPI] callPerAlarmDetailAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[callPerAlarmDetailAPI] callPerAlarmDetailAPI SUCCESS");
      dispatch({ type: GET_PERALARM, payload: result });
    }
  };
};

// 맨처음 개인 알람 조회
export const callFirstPerAlarmDetailAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/perAlarm/${memCode}`;

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
      "[callPerAlarmDetailAPI] callPerAlarmDetailAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[callPerAlarmDetailAPI] callPerAlarmDetailAPI SUCCESS");
      dispatch({ type: GET_FIRST_SEND, payload: result });
    }
  };
};

// 전체 알람 조회
export const callAllAlarmDetailAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/allAlarm/${memCode}`;

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
      "[callAllAlarmDetailAPI] callAllAlarmDetailAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[callAllAlarmDetailAPI] callAllAlarmDetailAPI SUCCESS");
      dispatch({ type: GET_ALLALARM, payload: result });
    }
  };
};

// 맨처음 전체 알람 조회
export const callFirstAllAlarmDetailAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/allAlarm/${memCode}`;

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
      "[callAllAlarmDetailAPI] callAllAlarmDetailAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[callAllAlarmDetailAPI] callAllAlarmDetailAPI SUCCESS");
      dispatch({ type: GET_FIRST_NOTICE, payload: result });
    }
  };
};

// 보낸 메세지 조회
export const callSendMessageAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/sendMessenger/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callSendMessageAPI] callSendMessageAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callSendMessageAPI] callSendMessageAPI SUCCESS");
      dispatch({ type: GET_SEND_MESSAGE, payload: result });
    }
  };
};

// 받은 메세지 조회
export const callRecMessageAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/recMessenger/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callRecMessageAPI] callRecMessageAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callRecMessageAPI] callRecMessageAPI SUCCESS");
      dispatch({ type: GET_REC_MESSAGE, payload: result });
    }
  };
};

// 처음 받은 메세지 조회
export const callFirstRecMessageAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/recMessenger/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callRecMessageAPI] callRecMessageAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callRecMessageAPI] callRecMessageAPI SUCCESS");
      dispatch({ type: GET_FIRST_REC, payload: result });
    }
  };
};

// 받은 메세지 확인 상태 업데이트
export const callMsgCheckStatusChangeAPI = ({ memCode }) => {
  console.log("[callMsgCheckStatusChangeAPI] callMsgCheckStatusChangeAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/recUpdateCheck/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[callMsgCheckStatusChangeAPI] callMsgCheckStatusChangeAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_ALARM_CHECK, payload: result });
  };
};

// 받은 메세지 삭제 상태 업데이트
export const callRecDeleteStatusUpdateAPI = ({ msgCode, memCode }) => {
    console.log("[callRecDeleteStatusUpdateAPI] callRecDeleteStatusUpdateAPI Call");
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/deleteRecMsg/${msgCode}/${memCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());
  
      console.log(
        "[callRecDeleteStatusUpdateAPI] callRecDeleteStatusUpdateAPI RESULT : ",
        result
      );
  
      dispatch({ type: PUT_MSG_CHECK, payload: result });
    };
  };

  // 보낸 메세지 삭제 상태 업데이트
export const callSendDeleteStatusUpdateAPI = ({ msgCode }) => {
    console.log("[callSendDeleteStatusUpdateAPI] callSendDeleteStatusUpdateAPI Call");
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/deleteSendAndRecMsg/${msgCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());
  
      console.log(
        "[callSendDeleteStatusUpdateAPI] callSendDeleteStatusUpdateAPI RESULT : ",
        result
      );
  
      dispatch({ type: PUT_MSG_CHECK, payload: result });
    };
  };


  // 개인 알람 확인 상태 업데이트
export const callAlarmCheckStatusChangeAPI = ({ perArmCode }) => {
  console.log("[callMsgCheckStatusChangeAPI] callMsgCheckStatusChangeAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/perAlarmCheckUpdate/${perArmCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[callMsgCheckStatusChangeAPI] callMsgCheckStatusChangeAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_ALARM_CHECK, payload: result });
  };
};

  // 공지사항 확인 상태 업데이트
  export const callNoticeCheckStatusChangeAPI = ({ allArmCode }) => {
    console.log("[callNoticeCheckStatusChangeAPI] callNoticeCheckStatusChangeAPI Call");
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/allAlarmCheckUpdate/${allArmCode}`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
      }).then((response) => response.json());
  
      console.log(
        "[callNoticeCheckStatusChangeAPI] callNoticeCheckStatusChangeAPI RESULT : ",
        result
      );
  
      dispatch({ type: PUT_ALARM_CHECK, payload: result });
    };
  };

  // 새 메신저 작성
  export const callSendNewMsgAPI = ({ form }) => {
    console.log("[callSendNewMsgAPI] callSendNewMsgAPI Call");
    console.log("form--->",form);
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/messenger`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
        body: form
      }).then((response) => response.json());
  
      console.log("[callSendNewMsgAPI] callSendNewMsgAPI RESULT : ", result);
  
      dispatch({ type: POST_MESSAGE, payload: result });
    };
  };

  // 받는 새 메신저 작성
  export const callRecNewMsgAPI = ({ form , codes}) => {
    console.log("[callRecNewMsgAPI] callRecNewMsgAPI Call");
    console.log("form--->",form);
  
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/recmessenger`;
  
    return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        },
        body: form,
      }).then((response) => response.json());
  
      console.log("[callRecNewMsgAPI] callRecNewMsgAPI RESULT : ", result);
  
      dispatch({ type: POST_REC_MESSAGE, payload: result });
    };
  };

  // 참조자인결재 조회
export const callReferencerAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/referencer/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callRecMessageAPI] callRecMessageAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callRecMessageAPI] callRecMessageAPI SUCCESS");
      dispatch({ type: GET_REFERENCE, payload: result });
    }
  };
};

// 결재자인 결재 조회
export const callApprovalAPI = ({ memCode }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/approval/${memCode}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[callRecMessageAPI] callRecMessageAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[callRecMessageAPI] callRecMessageAPI SUCCESS");
      dispatch({ type: GET_APP, payload: result });
    }
  };
};