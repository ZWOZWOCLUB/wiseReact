import { GET_APPROVAL_COMPLETE_INFO } from '../modules/ApprovalCompleteInfoModule';

export const callApprovalCompleteInfoAPI = ({ payCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/approval/approvalcomplete/${payCode}`;

    console.log("ff");
    
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
            dispatch({ type: GET_APPROVAL_COMPLETE_INFO, payload: result.data });
        }
    };
};
