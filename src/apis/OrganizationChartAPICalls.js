import {
    GET_ORGANIZATION_TREE,
    GET_ORGANIZATION_CARD,
    // GET_ORGANIZATION_EDIT,
    POST_ORGANIZATION_CREATE,

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
        // dispatch(callOrganizationCardAPI());
        dispatch({ type: POST_ORGANIZATION_CREATE, payload: result.data });
        console.log({result});
    };
};