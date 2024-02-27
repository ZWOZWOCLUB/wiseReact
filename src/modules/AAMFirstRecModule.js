import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FIRST_REC   = 'login/GET_FIRST_REC';

const actions = createActions({
    [GET_FIRST_REC]: () => {},

});

/* 리듀서 */
const aamFirstRecReducer = handleActions(
    {
        [GET_FIRST_REC]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamFirstRecReducer;