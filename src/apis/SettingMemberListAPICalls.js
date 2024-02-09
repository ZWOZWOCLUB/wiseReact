import{
    GET_MEMBERLIST,
    GET_DEPARTMENTLIST,
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

