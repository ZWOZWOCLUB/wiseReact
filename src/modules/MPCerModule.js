import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_CER   = 'login/GET_CER';

const actions = createActions({
    [GET_CER]: () => {},

});

/* 리듀서 */
const mpCerReducer = handleActions(
    {
        [GET_CER]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpCerReducer;

