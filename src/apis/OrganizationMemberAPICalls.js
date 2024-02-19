import {
    GET_ORGANIZATION_MEMBER,
} from '../modules/OrganizationMemberModule';

export const callOrganizationMemberAPI = ({currentPage}) => {
    console.log('[OrganizationMemberAPICalls] callOrganizationMemberAPI')
    console.log(currentPage);
    let requestURL;

    if (currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/memberList?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/memberList`;
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

        console.log('[OrganizationMemberAPICalls] callOrganizationMemberAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[OrganizationMemberAPICalls] callOrganizationMemberAPI SUCCESS');
            dispatch({ type: GET_ORGANIZATION_MEMBER, payload: result.data });

        }
    };
};