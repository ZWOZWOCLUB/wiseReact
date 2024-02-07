import { GET_MEM } from '../modules/MypageModule';


export const callMemberDetailAPI = ({ memCode }) => {
    console.log('api memCode',memCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/myPage/searchMem/${memCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[callMemberDetailAPI] callMemberDetailAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[callMemberDetailAPI] callMemberDetailAPI SUCCESS');
            dispatch({ type: GET_MEM, payload: result });
        }
    };
};