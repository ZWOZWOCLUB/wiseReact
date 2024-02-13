import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

//액션 타입

// 공지전체조회
export const GET_ALLVIEW_NOTICE = "notice/GET_ALL_VIEW_NOTICE"
//공지 제목, 내용, 작성자로 조회
export const GET_SEARCH_TITLE_NOTICE = "notice/GET_SERARCH_TITLE_NOTICE"
export const GET_SEARCH_COMMENT_NOTICE = "notice/GET_SEARCH_COMMENT_NOTICE"
export const GET_SEARCH_MEMBER_NOTICE = "notice/GET_SEARCH_MEMBER_NOTICE"
//공지 상세페이지 조회
export const GET_DETAILL_NOTICE = "notice/GET_DETAILL_NOTICE"
// 공지등록
export const GET_INSERT_NOTICE = "notice/GET_INSERT_NOTICE"
//공지 상세페이지 수정
export const PUT_UPDATE_NOTICE = "notice/PUT_UPDATE_NOTICE"

const actions = createActions ({
[GET_INSERT_NOTICE]: () => {},
[GET_ALLVIEW_NOTICE]: () => {},
[GET_SEARCH_TITLE_NOTICE]: () => {},
[GET_SEARCH_COMMENT_NOTICE]: () => {},
[GET_SEARCH_MEMBER_NOTICE]: () => {},
[GET_DETAILL_NOTICE]: () => {},
[PUT_UPDATE_NOTICE]: () => {}


})

//리듀서
const noticeReducer = handleActions (
    {
        [GET_INSERT_NOTICE]: (state, { payload }) => {
            
            return payload;
        },

        [GET_ALLVIEW_NOTICE]: (state, {payload}) => {

            return payload;
        },

        
        [GET_SEARCH_TITLE_NOTICE]: (state, {payload}) =>{
            
            return payload;
        },

        [GET_SEARCH_COMMENT_NOTICE]: (state, {payload}) =>{

            return payload;
        },
        
        [GET_SEARCH_MEMBER_NOTICE]: (state, {payload}) =>{

            return payload;
        },

        [GET_DETAILL_NOTICE]: (state, {payload}) =>{

            return payload;
        },

        [PUT_UPDATE_NOTICE]: (state, {payload}) =>{

            return payload;
        }
},
initialState
)

export default noticeReducer;