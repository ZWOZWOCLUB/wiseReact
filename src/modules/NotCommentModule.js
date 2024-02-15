import { createAction, handleActions } from "redux-actions";
const initialState = [];

export const GET_NOTICE_COMMENT = 'comment/GET_NOTICE_COMMENT';

const actions = createAction({
    [GET_NOTICE_COMMENT]: () => {}
});

const notCommentReducer = handleActions(
    {
        [GET_NOTICE_COMMENT]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default notCommentReducer;

