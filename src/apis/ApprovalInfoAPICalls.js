import { GET_APPROVAL_INFO, GET_APPROVAL_MEMBERR_INFO, GET_ATTENDANCE_TODAY_INFO } from '../modules/ApprovalInfoModule';

export const callApprovalInfoAPI = ({ payCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/approval/${payCode}`;

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
            dispatch({ type: GET_APPROVAL_INFO, payload: result.data });
        }
    };
};

export const callApprovalMemberInfoAPI = ({ form }) => {
    console.log('form', form);
    console.log('sdate', form.proStartDate);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/${form.proStartDate}/date/${form.proEndDate}/datte/${form.roleMember}`;

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
            dispatch({ type: GET_APPROVAL_MEMBERR_INFO, payload: result.data });
        }
        console.log('result', result);
    };
};

export const callAttendanceTodayInfoAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/attendance/${form.searchDate}/date/${form.memCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log('result today', result);

        if (result.status === 200) {
            dispatch({ type: GET_ATTENDANCE_TODAY_INFO, payload: result.data });
        }
    };
};
