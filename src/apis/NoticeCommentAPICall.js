import {
    GET_NOTICE_COMMENT,
    POST_NOTICE_COMMENT_INSERT
} from '../modules/NotCommentModule';

export const callNoticeCommentAPI = ({ notCode }) => {
    console.log(' callNoticeCommentAPI Call');
    console.log('notComment notCode',notCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/comment/notCodeSearch?nc=${notCode}`;

    return async (dispatch) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                // Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('callNoticeCommentAPI Result : ', result);
        if (result.status === 200) {
            console.log('callNoticeCommentAPI SUCCESS');
            dispatch({ type: GET_NOTICE_COMMENT, payload: result.data });
        }
    };
};
// 댓글 등록
export const callNoticeCommentInsertAPI = ({ form }) => { 
    
    console.log('callNoticeCommentInsertAPI Call');
    console.log('callNoticeCommentInsertAPI Call', form);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/comment/comment`;
    
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(form),
        }).then((response) => response.json());

        console.log('callNoticeCommentInsertAPI RESULT : ', result);

        dispatch({ type: POST_NOTICE_COMMENT_INSERT, payload: result.data });
        console.log({ result });
    };
}
