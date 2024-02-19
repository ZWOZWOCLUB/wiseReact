import { GET_APPROVAL_INFO, GET_APPROVAL_MEMBERR_INFO } from '../modules/ApprovalInfoModule';

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
