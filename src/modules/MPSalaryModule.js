import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SAL   = 'login/GET_SAL';

const actions = createActions({
    [GET_SAL]: () => {},

});

/* 리듀서 */
const mpSalReducer = handleActions(
    {
        [GET_SAL]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpSalReducer;

