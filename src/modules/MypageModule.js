import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEM   = 'login/GET_MEM';

const actions = createActions({
    [GET_MEM]: () => {},

});

/* 리듀서 */
const mypageReducer = handleActions(
    {
        [GET_MEM]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mypageReducer;