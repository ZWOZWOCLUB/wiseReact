import {
    PUT_ORGANIZATION_MODIFY,
} from "../modules/OrganizationModifyModule";
import { callOrganizationCardAPI } from "./OrganizationChartAPICalls";

export const callOrgModifyAPI = ({ depName, depCode }) => {
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
        }),
        }).then((response)=>response.json());

        console.log('[callOrgCreateAPI] callOrgCreateAPI result:', result);

        dispatch(callOrganizationCardAPI());
        dispatch({ type: PUT_ORGANIZATION_MODIFY, payload: result.data });
        console.log({result});
    };
};