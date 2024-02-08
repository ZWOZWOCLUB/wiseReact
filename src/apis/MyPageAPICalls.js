import { GET_CAREER } from '../modules/MPCareerModule';
import { GET_CER } from '../modules/MPCerModule';
import { GET_DEGREE } from '../modules/MPDegreeModule';
import { GET_MEM } from '../modules/MPModule';


export const callMemberDetailAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchMem/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callMemberDetailAPI] callMemberDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callMemberDetailAPI] callMemberDetailAPI SUCCESS');
            dispatch({ type: GET_MEM, payload: result });
        }
    };
};

// 학위 상세 조회
export const callDegreeDetailAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchDegree/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callDegreeDetailAPI] callDegreeDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callDegreeDetailAPI] callDegreeDetailAPI SUCCESS');
            dispatch({ type: GET_DEGREE, payload: result });
        }
    };
};

// 자격증 상세 조회
export const callCerDetailAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchCer/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callCerDetailAPI] callCerDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callCerDetailAPI] callCerDetailAPI SUCCESS');
            dispatch({ type: GET_CER, payload: result });
        }
    };
};

// 경력 상세 조회
export const callCareerDetailAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchCareer/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callCareerDetailAPI] callCareerDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callCareerDetailAPI] callCareerDetailAPI SUCCESS');
            dispatch({ type: GET_CAREER, payload: result });
        }
    };
};