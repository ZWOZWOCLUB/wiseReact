import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_VAC_HIS   = 'login/GET_VAC_HIS';

const actions = createActions({
    [GET_VAC_HIS]: () => {},

});

/* 리듀서 */
const mpVacHisReducer = handleActions(
    {
        [GET_VAC_HIS]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpVacHisReducer;

