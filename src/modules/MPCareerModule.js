import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_CAREER   = 'login/GET_CAREER';

const actions = createActions({
    [GET_CAREER]: () => {},

});

/* 리듀서 */
const mpCareerReducer = handleActions(
    {
        [GET_CAREER]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpCareerReducer;

