import {
    GET_ORGANIZATION_TREE,
    GET_ORGANIZATION_CARD,
    // GET_ORGANIZATION_EDIT,
    POST_ORGANIZATION_CREATE,
    PUT_ORGANIZATION_DELETE,
    PUT_ORGANIZATION_MODIFY,
    PUT_ORGANIZATION_UPDATEROLE,

} from '../modules/OrganizationChartModule';
import { GET_ORGANIZATION_LIST } from '../modules/OrganizationListModule';
import { GET_ORGANIZATION_REFLIST } from '../modules/OrganizationRefListModule';
import { callOrganizationListAPI } from './OrganizationListAPICalls';
import { callOrganizationRefListAPI } from './OrganizationRefListAPICalls';

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

            console.log(result);
        }
    }
}

export const callOrganizationCardAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/AllMemOfDep`;

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

            console.log('[OrganizationChartAPICalls] callOrganizationCardAPI SUCCESS');

            dispatch({ type: GET_ORGANIZATION_CARD, payload: result.data})

            console.log(result);
        }
    }
}

// export const callOrganizationEditAPI = (depCode) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/list/${depCode}`;

//     return async(dispatch) => {
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             },
//         }).then((response) => response.json());

//         if(result.status === 200){

//             console.log('[OrganizationChartAPICalls] callOrganizationEditAPI SUCCESS');

//             dispatch({ type: GET_ORGANIZATION_EDIT, payload: result.data})

//             console.log(result);
//         }
//     }
// }

export const callOrgCreateAPI = ({ depName, refDepCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/insertOrgDep`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
              },

        body: JSON.stringify({
            depName: depName,
            refDepCode: refDepCode,
        }),
        }).then((response)=>response.json());

        console.log('[callOrgCreateAPI] callOrgCreateAPI result:', result);
        dispatch(callOrganizationCardAPI());
        dispatch(callOrganizationListAPI());
        dispatch(callOrganizationRefListAPI());
        // dispatch({ type: POST_ORGANIZATION_CREATE, payload: result.data });
        console.log({result});
    };
};

export const callOrgDeleteAPI = ( depCode ) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/deleteOrgDep`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
              },

        body: JSON.stringify({
            depCode: depCode,
        }),
        }).then((response)=>response.json());

        console.log('[callOrgDeleteAPI] callOrgDeleteAPI result:', result);

        dispatch(callOrganizationCardAPI());
        // dispatch({ type: PUT_ORGANIZATION_DELETE, payload: result.data });
        console.log({result});
    };
};

export const callOrgModifyAPI = ({ depName, depCode, refDepCode }) => {
    console.log('[callOrgModifyAPI] callOrgModifyAPI 값 전달 확인:',depName, depCode, refDepCode)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/modifyOrgDep`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
              },

        body: JSON.stringify({
            depName: depName,
            depCode: depCode,
            refDepCode: refDepCode,
        }),
        }).then((response)=>response.json());

        console.log('[callOrgModifyAPI] callOrgModifyAPI result:', result);

        dispatch(callOrganizationCardAPI());
        dispatch(callOrganizationListAPI());
        dispatch(callOrganizationRefListAPI());
        // dispatch({ type: PUT_ORGANIZATION_MODIFY, payload: result.data });
        console.log({result});
    };
};

export const callUpdateRoleAPI = ({ memCode, memRole }) => {
    console.log('[callUpdateRoleAPI] callUpdateRoleAPI 값 전달 확인:',memCode, memRole)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/org/updateRole/`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Accept: "*/*",
                Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
              },

        body: JSON.stringify({
            memCode: memCode,
            memRole: memRole,
        }),
        }).then((response)=>response.json());

        console.log('[callUpdateRoleAPI] callUpdateRoleAPI result:', result);

        dispatch(callOrganizationCardAPI());


    };
};