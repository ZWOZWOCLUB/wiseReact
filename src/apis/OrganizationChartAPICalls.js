import {
    GET_ORGANIZATION_TREE
} from '../modules/OrganizationChartModule';

export const callOrganizationTreeAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/treeView`;

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

            console.log('[OrganizationChartAPICalls] callOrganizationTreeAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_TREE, payload: result.data})
        }
    }
}