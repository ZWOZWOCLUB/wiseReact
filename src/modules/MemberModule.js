import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEM   = 'login/GET_MEM';
export const POST_LOGIN     = 'login/POST_LOGIN';
export const POST_REGISTER  = 'login/POST_REGISTER';

const actions = createActions({
    [GET_MEM]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {}
});

/* 리듀서 */
const memberReducer = handleActions(
    {
        [GET_MEM]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default memberReducer;