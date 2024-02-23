import {
    GET_ALLVIEW_NOTICE,
    POST_INSERT_NOTICE,
    GET_SEARCH_TITLE_NOTICE,
    GET_SEARCH_COMMENT_NOTICE,
    GET_SEARCH_MEMBER_NOTICE,
    GET_DETAIL_NOTICE,
    PUT_UPDATE_NOTICE,
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
