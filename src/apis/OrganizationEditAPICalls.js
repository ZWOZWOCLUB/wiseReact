import {
    GET_ORGANIZATION_EDIT,
    PUT_ORGANIZATION_UPDATE,

} from '../modules/OrganizationEditModule';

export const callOrganizationEditAPI = (depCode) => {
    console.log("callOrganizationEditAPI ==> 코드값 넘어오는지 확인", depCode)
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

            console.log('[OrganizationEditAPICalls] callOrganizationEditAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_EDIT, payload: result.data})

            console.log(result);
        }
    }
}

export const callOrganizationUpdateAPI = ({depCode, memCodes}) =>{
    console.log("callOrganizationUpdateAPI ==> 값 넘오는 것 확인", depCode, memCodes)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/insertMember/${depCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
              },

        body: JSON.stringify(memCodes),
        }).then((response)=>response.json());

        console.log('[callOrganizationUpdateAPI] callOrganizationUpdateAPI result:', result);
        dispatch(callOrganizationEditAPI(depCode));
        dispatch({ type: PUT_ORGANIZATION_UPDATE, payload: result.data });
        console.log({result});
    };
}