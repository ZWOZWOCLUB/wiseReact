import {
    GET_PAYLIST
} from '../modules/PayModule.js';

export const callPayListAPI = ({ memCode, yearMonth }) => {
    console.log('[PayListAPICalls] caalPayListAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/pay/payList/${memCode}/${yearMonth}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                "Authorization": `Bearer ${process.env.REACT_APP_TOKEN_KEY}`
            },
        }).then((response) => response.json());

        console.log('[PayListAPICalls] caalPayListAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[PayListAPICalls] caalPayListAPI SUCCESS');
            dispatch({ type: GET_PAYLIST, payload: result.data });
        }
    };
};
