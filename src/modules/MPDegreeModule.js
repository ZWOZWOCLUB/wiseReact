import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_DEGREE   = 'login/GET_DEGREE';

const actions = createActions({
    [GET_DEGREE]: () => {},

});

/* 리듀서 */
const mpDegreeReducer = handleActions(
    {
        [GET_DEGREE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpDegreeReducer;

