import {
    PUT_ORGANIZATION_DELETE,
} from "../modules/OrganizationDeleteModule";
import { callOrganizationCardAPI } from "./OrganizationChartAPICalls";

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
        dispatch({ type: PUT_ORGANIZATION_DELETE, payload: result.data });
        console.log({result});
    };
};