import {
    GET_ORGANIZATION_LIST
} from '../modules/OrganizationListModule';

export const callOrganizationListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/list`;

    return async(dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }).then((response)=>response.json());

        if(result.status === 200){
            console.log('[OrganizationItemAPICalls] callOrganizationlistAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_LIST, payload: result.data})

            console.log(result);

        }
    }
}