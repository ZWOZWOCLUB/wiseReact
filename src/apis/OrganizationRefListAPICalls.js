import {
    GET_ORGANIZATION_REFLIST,
} from '../modules/OrganizationRefListModule';

export const callOrganizationRefListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/repList`;

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
            console.log('[OrganizationRefListAPICalls] callOrganizationRefListAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_REFLIST, payload: result.data})

            console.log(result);

        }
    }
}
