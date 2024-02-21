import { GET_APPROVAL_TYPE_INFO, POST_ATTENDANCE_SCHEDULE_INFO } from '../modules/ApprovalTypeModule';

export const callApprovalTypeInfoAPI = ({ payCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/approvaltype/${payCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_APPROVAL_TYPE_INFO, payload: result.data });
        }
    };
};

// 개인 스케줄 조회
export const callScheduleMainSearchAPI = ({ yearMonth }) => {
    console.log('이어먼스', yearMonth);
    console.log('이어먼스23', yearMonth.memCode);
    console.log('이어먼스123', yearMonth.searchDate);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/${yearMonth.memCode}/schedule/${yearMonth.searchDate}`;
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({ yearMonth }),
        }).then((response) => response.json());

        console.log('[callScheduleSearchAPI] callScheduleSearchAPI RESULT : ', result);
        if (result.status === 200) {
            dispatch({ type: POST_ATTENDANCE_SCHEDULE_INFO, payload: result.data });
            console.log('개인스케줄 ', { result });
        }
    };
};
