import { GET_APPROVAL_TYPE_INFO } from '../modules/ApprovalTypeModule';

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
