import {
    GET_YEAR,
    GET_POSITION,
} from '../modules/OtherModule.js';


export const callPayYEARAPI = ({ memCode }) => {
    console.log('[callPayYEARAPI] callPayYEARAPI Call');

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/pay/hireYearList/${memCode}`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callPayYEARAPI] callPayYEARAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callPayYEARAPI] callPayYEARAPI SUCCESS');
            dispatch({ type: GET_YEAR, payload: result.data });
        }
    };
};

    //직위 조회
    export const callSearchPosAPI = () => {
        console.log('[callSearchPosAPI] callSearchPosAPI Call')    
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/position`;
    
        
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
            method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            }).then((response) => response.json());
        
            console.log('[callSearchPosAPI] callSearchPosAPI RESULT : ', result);
            if (result.status === 200) {
                console.log('[callSearchPosAPI] callSearchPosAPI SUCCESS');
                dispatch({ type: GET_POSITION, payload: result.data });
                }
            };
        };