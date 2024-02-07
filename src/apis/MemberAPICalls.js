import { GET_MEMBER, POST_LOGIN, POST_REGISTER } from '../modules/MemberModule';


export const callLoginAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/login`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                id: form.memberId,
                pass: form.memberPassword,
            }),
        }).then((response) => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if (result.status === 200) {
            window.localStorage.removeItem('accessToken');  // 나중에 꼭 빼야함
            window.localStorage.setItem('accessToken', result.userInfo.accessToken);
        }
        alert('로그인 성공!');
        dispatch({ type: POST_LOGIN, payload: result });
    };
};

export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
};

