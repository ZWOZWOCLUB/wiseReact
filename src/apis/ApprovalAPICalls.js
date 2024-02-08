import {
    GET_RECIEVE_APPROVAL,
    GET_SEND_APPROVAL,
    POST_APPROVAL_ANNUAL,
    POST_APPROVAL_COMMUTE,
    POST_APPROVAL_SCHEDULE,
    POST_APPROVAL_RETIRED,
    POST_APPROVAL_REQ_DOCUMENT,
    PUT_APPROVAL_COMPLTE,
    PUT_APPROVAL_ROLE_UPDATE,
    PUT_APPROVAL_ROLE_RECOVERY,
    GET_APPROVAL_MEMBER_INFO,
} from '../modules/ApprovalModule.js';

export const callReceiveApprovalAPI = ({ memCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/receivedapproval/${memCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_RECIEVE_APPROVAL, payload: result.data });
        }
    };
};

export const callSendApprovalAPI = ({ memCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/sendapproval/${memCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_SEND_APPROVAL, payload: result.data });
        }
    };
};

export const callMemberInfoAPI = ({ memCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/memberinfo/${memCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_APPROVAL_MEMBER_INFO, payload: result.data });
        }
    };
};

export const callAprovalAnnualAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/annual`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: POST_APPROVAL_ANNUAL, payload: result });
    };
};

export const callAprovalCommuteAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/commute`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: POST_APPROVAL_COMMUTE, payload: result });
    };
};

export const callAprovalScheduleAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/schedule`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: POST_APPROVAL_SCHEDULE, payload: result });
    };
};

export const callAprovalRequestDocumentAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/requestdocument`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: POST_APPROVAL_REQ_DOCUMENT, payload: result });
    };
};

export const callAprovalRetiredAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/retired`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: POST_APPROVAL_RETIRED, payload: result });
    };
};

export const callAprovalCompleteAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/complete`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: PUT_APPROVAL_COMPLTE, payload: result });
    };
};

export const callRoleUpdateAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/roleupdate`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: PUT_APPROVAL_ROLE_UPDATE, payload: result });
    };
};

export const callRoleRecoveryAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/rolerecovery`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: PUT_APPROVAL_ROLE_RECOVERY, payload: result });
    };
};
