import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SIGN   = 'login/GET_SIGN';
export const PUT_SIGN   = 'login/PUT_SIGN';

const actions = createActions({
    [GET_SIGN]: () => {},
    [PUT_SIGN]: () => {},

});

/* 리듀서 */
const mpSignReducer = handleActions(
    {
        [GET_SIGN]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_SIGN]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpSignReducer;

