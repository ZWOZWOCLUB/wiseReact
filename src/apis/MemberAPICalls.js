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
            window.localStorage.removeItem('accessToken');  // 필요에 따라 기존 토큰 제거
            window.localStorage.setItem('accessToken', result.userInfo.accessToken); // 새 토큰 저장

            alert('로그인 성공!'); // 성공 알림
            dispatch({ type: POST_LOGIN, payload: result });
            
        } else {
            // 로그인 실패 시 사용자에게 실패 알림
            alert('로그인 실패: ' + (result.message || '로그인 실패'));
        }
        
    };
};

export const callLogoutAPI = () => {
    return async (dispatch, getState) => {
        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
};

