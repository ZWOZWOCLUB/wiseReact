import { GET_ATT } from '../modules/MPATTModule';
import { GET_CAREER } from '../modules/MPCareerModule';
import { GET_CER } from '../modules/MPCerModule';
import { GET_DEGREE } from '../modules/MPDegreeModule';
import { GET_DOC } from '../modules/MPDocModule';
import { GET_MEM } from '../modules/MPModule';
import { GET_VAC_HIS } from '../modules/MPVacHisModule';
import { GET_VAC } from '../modules/MPVacModule';


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

// 서류함 상세 조회
export const callDocAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/document/${memCode}`;

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
            dispatch({ type: GET_DOC, payload: result });
        }
    };
};

// 출퇴근 상세 조회
export const callATTAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/attendance/${memCode}/2024-01-01`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callATTAPI] callATTAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callATTAPI] callATTAPI SUCCESS');
            dispatch({ type: GET_ATT, payload: result });
        }
    };
};

// 소유/소멸연차 상세 조회
export const callVacAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/ownAnnual/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callATTAPI] callATTAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callATTAPI] callATTAPI SUCCESS');
            dispatch({ type: GET_VAC, payload: result });
        }
    };
};

// 사용 연차 상세 조회
export const callVacHisAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/annualHistory/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callATTAPI] callATTAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callATTAPI] callATTAPI SUCCESS');
            dispatch({ type: GET_VAC_HIS, payload: result });
        }
    };
};