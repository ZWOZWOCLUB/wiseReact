import {
    GET_ALLVIEW_NOTICE,
    POST_INSERT_NOTICE,
    GET_SEARCH_TITLE_NOTICE,
    GET_SEARCH_COMMENT_NOTICE,
    GET_SEARCH_MEMBER_NOTICE,
    GET_DETAIL_NOTICE,
    PUT_UPDATE_NOTICE,
} from '../modules/NoticeModule.js';

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
// NoticeAPICalls.js
// export const callDetailNoticeAPI = (notCode) => async (dispatch) => {
//     try {
//       const response = await fetch(`/api/notice/${notCode}`);
//       const data = await response.json();
//       dispatch({ type: "FETCH_NOTICE_DETAIL_SUCCESS", payload: data });
//     } catch (error) {
//       dispatch({ type: "FETCH_NOTICE_DETAIL_FAILURE", payload: error });
//     }
//   };
