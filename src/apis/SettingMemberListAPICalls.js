import {
    GET_MEMBERLIST,
    GET_DEPARTMENTLIST,
    POST_ATTENDANCE,
} from '../modules/SettingModule.js';

//전체 회원 조회
export const callSearchSettingMemberAPI = ({ currentPage }) => {
    console.log('[SettingMemberListAPICalls] callSearchSettingMemberAPI Call')
    console.log(currentPage);
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/allMemberSearch?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/allMemberSearch`;
    }


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[SettingMemberListAPICalls] callSearchSettingMemberAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[SettingMemberListAPICalls] callSearchSettingMemberAPI SUCCESS');
            dispatch({ type: GET_MEMBERLIST, payload: result.data });

        }
    };
};


//부서 조회
export const callSearchDepAPI = () => {
    console.log('[callSearchDepAPI] callSearchDepAPI Call')
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/depSearch`;


    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callSearchDepAPI] callSearchDepAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callSearchDepAPI] callSearchDepAPI SUCCESS');
            dispatch({ type: GET_DEPARTMENTLIST, payload: result.data });
        }
    };
};

//근태 조회
export const callAttendanceAPI = ({yearMonth}) => {
    console.log('[callAttendanceAPI] callAttendanceAPI Call')
    console.log('yearMonth', yearMonth)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/attendance`;
    console.log('여기', yearMonth)

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({ yearMonth })

        }).then((response) => response.json());

        console.log('[callAttendanceAPI] callAttendanceAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callAttendanceAPI] callAttendanceAPI SUCCESS');
            dispatch({ type: POST_ATTENDANCE, payload: result.data });
        }
    };
};

