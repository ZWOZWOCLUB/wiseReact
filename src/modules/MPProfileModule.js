import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_PRO   = 'login/GET_PRO';

const actions = createActions({
    [GET_PRO]: () => {},

});

/* 리듀서 */
const mpProReducer = handleActions(
    {
        [GET_PRO]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpProReducer;

