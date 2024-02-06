import {
    GET_YEAR
} from '../modules/YearModule.js';


export const callPayYEARAPI = ({ memCode }) => {
    console.log('[callPayYEARAPI] callPayYEARAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/pay/hireYearList/${memCode}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                "Authorization": `Bearer ${process.env.REACT_APP_TOKEN_KEY}`
            },
        }).then((response) => response.json());

        console.log('[callPayYEARAPI] callPayYEARAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callPayYEARAPI] callPayYEARAPI SUCCESS');
            dispatch({ type: GET_YEAR, payload: result.data });
        }
    };
};