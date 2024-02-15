import {
    POST_ORGANIZATION_CREATE,

} from "../modules/OrganizationCreateModule";
import { callOrganizationCardAPI } from "./OrganizationChartAPICalls";

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
        dispatch({ type: POST_ORGANIZATION_CREATE, payload: result.data });
        console.log({result});
    };
};