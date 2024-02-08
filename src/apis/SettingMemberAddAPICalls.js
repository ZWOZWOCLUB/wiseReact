import{
    POST_MEMBERADD,
    PUT_MEMBERADD
} from '../modules/SettingMemberModule.js';

//회원 등록
export const callMemberAddAPI = ({ form }) => {
    console.log('callMemberAddAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/member`;
    console.log('formData', form);
    // console.log('profile', profile);
    console.log('----------', window.localStorage.getItem('accessToken'));
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
        method: 'POST',
        headers: {
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            
        },
        
        body: form, 
        }).then((response) => response.json());
    
        console.log('[callMemberAddAPI] callMemberAddAPI RESULT : ', result);
       
            dispatch({ type: POST_MEMBERADD, payload: result.data });
            console.log({result});
        };
    };

    //회원 수정

    export const callMemberUpdateAPI = ({ form }) => {
        console.log('callMemberUpdateAPI Call');
        const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/member`;
        console.log('formData', form);
        // console.log('profile', profile);
        console.log('----------', window.localStorage.getItem('accessToken'));
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                
            },
            
            body: form, 
            }).then((response) => response.json());
        
            console.log('[callMemberUpdateAPI] callMemberUpdateAPI RESULT : ', result);
           
                dispatch({ type: PUT_MEMBERADD, payload: result.data });
                console.log({result});
           
            };
        };


