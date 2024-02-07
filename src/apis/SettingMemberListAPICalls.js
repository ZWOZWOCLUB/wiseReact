import{
    GET_MEMBERLIST,
    GET_DEPARTMENTLIST,
    POST_MEMBERADD,
} from '../modules/SettingModule.js';

//전체 회원 조회
export const callSearchSettingMemberAPI = ({ currentPage }) => {
    console.log('[SettingMemberListAPICalls] callSearchSettingMemberAPI Call')    
    console.log(currentPage);
    let requestURL;

    if(currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/allMemberSearch?offset=${currentPage}`;
    }else{
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/allMemberSearch`;
    }

    
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
        method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        }).then((response) => response.json());
    
        console.log('[SettingMemberListAPICalls] callSearchSettingMemberAPI RESULT : ', result);
        if (result.status === 200) {
            console.log('[SettingMemberListAPICalls] callSearchSettingMemberAPI SUCCESS');
            dispatch({ type: GET_MEMBERLIST, payload: result.data });
            }
        };
    };
    
// 회원 이름으로 검색 
    // export const callSearchMemberAPI = ({ search }) => {
    //     console.log('[callSearchMemberAPI] callSearchMemberAPI Call')    
    //     console.log(search);
    //     let requestURL;
    
    //         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/search?s=${search}`;
    
        
    //     return async (dispatch, getState) => {
    //         const result = await fetch(requestURL, {
    //         method: 'GET',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             Accept: '*/*',
    //             "Authorization": `Bearer ${process.env.REACT_APP_TOKEN_KEY}`
    //             },
    //         }).then((response) => response.json());
        
    //         console.log('[callSearchMemberAPI] callSearchMemberAPI RESULT : ', result);
    //         if (result.status === 200) {
    //             console.log('[callSearchMemberAPI] callSearchMemberAPI SUCCESS');
    //             dispatch({ type: GET_MEMBERLIST, payload: result.data });
    //             }
    //         };
    //     };


        
    //부서 조회
    export const callSearchDepAPI = () => {
        console.log('[callSearchDepAPI] callSearchDepAPI Call')    
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/depSearch`;
    
        
        return async (dispatch, getState) => {
            const result = await fetch(requestURL, {
            method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            }).then((response) => response.json());
        
            console.log('[callSearchDepAPI] callSearchDepAPI RESULT : ', result);
            if (result.status === 200) {
                console.log('[callSearchDepAPI] callSearchDepAPI SUCCESS');
                dispatch({ type: GET_DEPARTMENTLIST, payload: result.data });
                }
            };
        };

//회원 등록
export const callMemberAddAPI = ({ form,profile }) => {
    console.log('callMemberAddAPI Call');
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/setting/member`;
    console.log('form', form);
    console.log('profile', profile);
    console.log('----------', window.localStorage.getItem('accessToken'));
    return async (dispatch, getState) => {

        // const formData = new FormData();

        // formData.append('memName', form.memName);
        // formData.append('memPhone', form.memPhone);
        // formData.append('memEmail', form.memEmail);
        // formData.append('memAddress', form.memAddress);
        // formData.append('memBirth', form.memBirth);
        // formData.append('memPassword', form.memPassword);
        // formData.append('memHireDate', form.memHireDate);
        // formData.append('memStatus', form.memStatus);
        // formData.append('memRole', form.memRole);
        // formData.append('posCode', form.posCode);
        // formData.append('depCode', form.depCode);

        // formData.append('profile', profile);


        // console.log('!!!!!!!!!!!!!!!!',formData);
        const result = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            
        },
        
        body: {form, profile}
        }).then((response) => response.json());
    
        console.log('[callMemberAddAPI] callMemberAddAPI RESULT : ', result);
       
            dispatch({ type: POST_MEMBERADD, payload: result });
       
        };
    };

