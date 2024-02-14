import { GET_ALLALARM } from '../modules/AAMAllAlarmModule';
import { GET_PERALARM } from '../modules/AAMPerAlarmModule';
import { GET_REC_MESSAGE } from '../modules/AAMRecMessageModule';
import { GET_SEND_MESSAGE } from '../modules/AAMSendMessageModule';


// 개인 알람 조회
export const callPerAlarmDetailAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/perAlarm/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callPerAlarmDetailAPI] callPerAlarmDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callPerAlarmDetailAPI] callPerAlarmDetailAPI SUCCESS');
            dispatch({ type: GET_PERALARM, payload: result });
        }
    };
};

// 보낸 메세지 조회
export const callSendMessageAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/sendMessenger/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callSendMessageAPI] callSendMessageAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callSendMessageAPI] callSendMessageAPI SUCCESS');
            dispatch({ type: GET_SEND_MESSAGE, payload: result });
        }
    };
};

// 받은 메세지 조회
export const callRecMessageAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/alarm/recMessenger/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callRecMessageAPI] callRecMessageAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callRecMessageAPI] callRecMessageAPI SUCCESS');
            dispatch({ type: GET_REC_MESSAGE, payload: result });
        }
    };
};



