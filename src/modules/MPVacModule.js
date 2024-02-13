import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_VAC   = 'login/GET_VAC';

const actions = createActions({
    [GET_VAC]: () => {},

});

/* 리듀서 */
const mpVacReducer = handleActions(
    {
        [GET_VAC]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpVacReducer;

