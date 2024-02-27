import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];
// const initialState = {
//     detail: {},
//     error: null,
//   };

//액션 타입

// 공지전체조회
export const GET_ALLVIEW_NOTICE = 'notice/GET_ALL_VIEW_NOTICE';
//공지 제목, 내용, 작성자로 조회
export const GET_SEARCH_TITLE_NOTICE = 'notice/GET_SERARCH_TITLE_NOTICE';
export const GET_SEARCH_COMMENT_NOTICE = 'notice/GET_SEARCH_COMMENT_NOTICE';
export const GET_SEARCH_MEMBER_NOTICE = 'notice/GET_SEARCH_MEMBER_NOTICE';
//공지 상세페이지 조회
export const GET_DETAIL_NOTICE = 'notice/GET_DETAIL_NOTICE';
// 공지등록
export const POST_INSERT_NOTICE = 'notice/POST_INSERT_NOTICE';
//공지 상세페이지 수정
export const PUT_UPDATE_NOTICE = 'notice/PUT_UPDATE_NOTICE';
//공지 삭제
export const PUT_DELETE_NOTICE = 'notice/PUT_DELETE_NOTICE';

const actions = createActions({
    [POST_INSERT_NOTICE]: () => {},
    [GET_ALLVIEW_NOTICE]: () => {},
    [GET_SEARCH_TITLE_NOTICE]: () => {},
    [GET_SEARCH_COMMENT_NOTICE]: () => {},
    [GET_SEARCH_MEMBER_NOTICE]: () => {},
    [GET_DETAIL_NOTICE]: () => {},
    [PUT_UPDATE_NOTICE]: () => { },
    [PUT_DELETE_NOTICE]: () => { },
});

//리듀서
const noticeReducer = handleActions(
    {
        [POST_INSERT_NOTICE]: (state, { payload }) => {
            return payload;
        },

        [GET_ALLVIEW_NOTICE]: (state, { payload }) => {
            return payload;
        },

        [GET_SEARCH_TITLE_NOTICE]: (state, { payload }) => {
            return payload;
        },

        [GET_SEARCH_COMMENT_NOTICE]: (state, { payload }) => {
            return payload;
        },

        [GET_SEARCH_MEMBER_NOTICE]: (state, { payload }) => {
            return payload;
        },

        [GET_DETAIL_NOTICE]: (state, { payload }) => {
            return payload;
        },

        [PUT_UPDATE_NOTICE]: (state, { payload }) => {
            return payload;
        },
        
        [PUT_DELETE_NOTICE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default noticeReducer;
