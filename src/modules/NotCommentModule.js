import { createAction, handleActions } from "redux-actions";
const initialState = [];

export const GET_NOTICE_COMMENT = 'comment/GET_NOTICE_COMMENT';

export const POST_NOTICE_COMMENT_INSERT = 'comment/POST_NOTICE_COMMENT_INSERT';

const actions = createAction({
    [GET_NOTICE_COMMENT]: () => {},
    [POST_NOTICE_COMMENT_INSERT]: () => {}
});

const notCommentReducer = handleActions(
    {
        [GET_NOTICE_COMMENT]: (state, { payload }) => {
            return payload;
        },
        [POST_NOTICE_COMMENT_INSERT]: (state, { payload }) => {
            return [...state, payload];
                
                
        },
    },
    initialState
);

export default notCommentReducer;

