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
    GET_APPROVAL_ATTACHMENT_INFO,
} from '../modules/ApprovalModule.js';



export const callReceiveApprovalAPI = ({ form }) => {
    console.log('Rform', form);

    let requestURL;

    if (form.currentPage !== undefined || form.currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/receivedapproval/${form.memCode}?offset=${form.currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/receivedapproval/${form.memCode}`;
    }
    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('받은 결재 result ', result);

        if (result.status === 200) {
            dispatch({ type: GET_RECIEVE_APPROVAL, payload: result.data });
        }
    };
};

export const callSendApprovalAPI = ({ form }) => {
    let requestURL;

    if (form.currentPage !== undefined || form.currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/sendapproval/${form.memCode}?offset=${form.currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/sendapproval/${form.memCode}`;
    }

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('보낸 결재 result ', result);

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
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_APPROVAL_MEMBER_INFO, payload: result.data });
        }
    };
};

export const callAprovalAnnualAPI = ({ form }) => {
    console.log('언디?', form);
    console.log('form.approval.payKind', form.get('approval.payDate'));

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/annual`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        console.log('result', result);

        dispatch({ type: POST_APPROVAL_ANNUAL, payload: result });
        console.log('result2', result);
    };
};

export const callAprovalCommuteAPI = ({ form }) => {
    console.log('formCode', form.get('cMember.memCode'));

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/commute`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());
        console.log('result', result);

        dispatch({ type: POST_APPROVAL_COMMUTE, payload: result });
    };
};

export const callAprovalScheduleAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/schedule`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
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
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
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
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: POST_APPROVAL_RETIRED, payload: result });
    };
};

export const callAprovalCompleteAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/complete`;

    console.log('---------> ', form);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(form),
        }).then((response) => response.json());

        console.log('result', result);

        dispatch({ type: PUT_APPROVAL_COMPLTE, payload: result });
    };
};

export const callRoleUpdateAPI = ({ form }) => {
    console.log('????');
    console.log('ccccomform', form);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/roleupdate`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(form),
        }).then((response) => response.json());

        console.log('result', result);

        dispatch({ type: PUT_APPROVAL_ROLE_UPDATE, payload: result });
        console.log('result', result);
    };
};

export const callRoleRecoveryAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/rolerecovery`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        dispatch({ type: PUT_APPROVAL_ROLE_RECOVERY, payload: result });
    };
};

export const callApprovalAttachmentInfoAPI = ({ payCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/approvalattachment/${payCode}`;

    console.log('attachment url', requestURL);

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('res', result);

        if (result.status === 200) {
            dispatch({ type: GET_APPROVAL_ATTACHMENT_INFO, payload: result.data });
        }
    };
};
