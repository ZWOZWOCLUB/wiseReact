import {
GET_ALLVIEW_NOTICE,
GET_INSERT_NOTICE,
GET_SEARCH_TITLE_NOTICE,
GET_SEARCH_COMMENT_NOTICE,
GET_SEARCH_MEMBER_NOTICE,
GET_DETAILL_NOTICE,
PUT_UPDATE_NOTICE
} from '../modules/NoticeModule.js'

export const callAllViewNoticeAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/allNoticeSearch`;

    return async (dispatch) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_ALLVIEW_NOTICE, payload: result.data });
        }
    }
}

export const callSearchTitleNoticeAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/titleSearch`;
    
    return async (dispatch) =>{
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
    }
}

export const callSearchCommentNoticeAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/commentSearch`;

    return async (dispatch) =>{
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
    }
}

export const callSearchMemberNameNoticeAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/memberNameSearch`;

    return async (dispatch) =>{
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
    }
}

export const callDetaillNoticeAPI = ({notCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/notice/detaill`;

    return async (dispatch) =>{
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        }).then((response) => response.json());

        if (result.status === 200) {
            dispatch({ type: GET_DETAILL_NOTICE, payload: result.data });
        }
    }
}