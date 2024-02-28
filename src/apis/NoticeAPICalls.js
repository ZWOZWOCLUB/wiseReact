import { PUT_COMMENT_DELETE } from '../modules/ApprovalInfoModule.js';
import {
    GET_ALLVIEW_NOTICE,
    POST_INSERT_NOTICE,
    GET_SEARCH_TITLE_NOTICE,
    GET_SEARCH_COMMENT_NOTICE,
    GET_SEARCH_MEMBER_NOTICE,
    GET_DETAIL_NOTICE,
    PUT_UPDATE_NOTICE,
    PUT_DELETE_NOTICE,
} from '../modules/NoticeModule.js';

//공지 전체조회
export const callAllViewNoticeAPI = ({ currentPage }) => {
    console.log('[NoticeListAPICall] callAllViewNoticeAPI Call');
    console.log(currentPage);
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/allNoticeSearch?offset=${currentPage}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/allNoticeSearch`;
    }

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                // Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[NoticeListAPICall] callAllViewNoticeAPI Result : ', result);
        if (result.status === 200) {
            console.log('[NoticeListAPICall] callAllViewNoticeAPI SUCCESS');
            dispatch({ type: GET_ALLVIEW_NOTICE, payload: result.data });
        }
    };
};

//공지 제목으로 조회
export const callSearchTitleNoticeAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/titleSearch`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_SEARCH_TITLE_NOTICE, payload: result.data });
        }
    };
};

//공지 내용으로 조회
export const callSearchCommentNoticeAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/commentSearch`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_SEARCH_COMMENT_NOTICE, payload: result.data });
        }
    };
};

//공지 작성자로 조회
export const callSearchMemberNameNoticeAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/memberNameSearch`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_SEARCH_MEMBER_NOTICE, payload: result.data });
        }
    };
};

//공지 상세페이지 조회
export const callDetailNoticeAPI = ({ notCode }) => {
    console.log('callDetailNoticeAPI Call');
    console.log('notCode', notCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/detail?nc=${notCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());
        console.log('callDetailNoticeAPI end');

        if (result.status === 200) {
            dispatch({ type: GET_DETAIL_NOTICE, payload: result.data });
        }
        console.log({ result });
    };
};

//공지 등록
export const callNoticeInsertAPI = ({ form }) => {
    console.log('callNoticeInsertAPI Call');
    console.log('callNoticeInsertAPI Call', form);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/notice`;
    console.log('formData', form);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        console.log('callNoticeInsertAPI RESULT : ', result);
        console.log('callNoticeInsertAPI form', form);
        dispatch({ type: POST_INSERT_NOTICE, payload: result.data });
        console.log({ result });
        console.log(result);

        console.log({ FormData });
    };
};

//공지수정
export const callNoticeUpdateAPI = ({ form }) => {
    console.log('callNoticeUpdateAPI Call');
    console.log('callNoticeUpdateAPI', form.get('notDeleteStatus'));

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/updateNotice`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: form,
        }).then((response) => response.json());

        console.log('callNoticeUpdateAPI : ', result);

        dispatch({ type: PUT_UPDATE_NOTICE, payload: result });
    };
};
//공지삭제
export const callNoticeDeleteAPI = (selectedNotices) => {
    console.log('callNoticeDeleteAPI Call');

    // selectedNotices를 올바른 형식으로 전달받았다고 가정
    console.log('callNoticeDeleteAPI', selectedNotices);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/deleteNotice`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(selectedNotices), // 올바른 형식으로 변환
            });
            const result = await response.json();
            console.log('callNoticeUpdateAPI : ', result);

            dispatch({ type: PUT_DELETE_NOTICE, payload: result });
        } catch (error) {
            console.error('Error calling callNoticeDeleteAPI:', error);
        }
    };
};

export const CallDeleteCommentAPI = (comCode) => {
    console.log('callCommentDeleteAPI Call');

    // selectedNotices를 올바른 형식으로 전달받았다고 가정
    console.log('callCommentDeleteAPI', comCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/comment/commentDelete`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(comCode),
            });
            const result = await response.json();
            console.log('callNoticeUpdateAPI : ', result);

            dispatch({ type: PUT_COMMENT_DELETE, payload: result });
        } catch (error) {
            console.error('Error calling callNoticeDeleteAPI:', error);
        }
    };
};

// export const callNoticeDeleteAPI = (selectedNotices) => {
//     console.log('callNoticeDeleteAPI Call');
//     console.log('callNoticeDeleteAPI', selectedNotices);
//     // console.log('callNoticeDeleteAPI', form.get('notDeleteStatus'));

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/deleteNotice`;

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json', //컨텐츠타입 확인 (문자열 형식만 날라감 (파일X)) => 백에서 값이 올때 값의 형태확인
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             },
//             body: JSON.stringify(selectedNotices), //문자열형태로 바꿔서 백으로 전달
//             //(백)모델어트리뷰트는 문자열형태를 받을 수 없다 그래서 리퀘스트바디로 수정
//         }).then((response) => response.json());

//         console.log('callNoticeUpdateAPI : ', result);

//         dispatch({ type: PUT_DELETE_NOTICE, payload: result });
//     };
// };
