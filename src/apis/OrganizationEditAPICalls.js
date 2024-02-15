import {
    GET_ORGANIZATION_EDIT,

} from '../modules/OrganizationEditModule';

export const callOrganizationEditAPI = (depCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/list/${depCode}`;

    return async(dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        if(result.status === 200){

            console.log('[OrganizationChartAPICalls] callOrganizationEditAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_EDIT, payload: result.data})

            console.log(result);
        }
    }
}