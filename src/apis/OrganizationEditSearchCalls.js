import {
    GET_ORGANIZATION_SEARCH_NAME,
} from '../modules/OrganizationEditSearchModule';


export const callOrgSearchNameAPI = ({ search }) => {

    console.log("callOrgSearchNameAPI ==> 값 넘오는 것 확인", search);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/nameSearch?n=${search}`;
    
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

            console.log('[OrganizationEditAPICalls] callOrgSearchNameAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_SEARCH_NAME, payload: result.data})

            console.log(result);
        }
    }
    
}