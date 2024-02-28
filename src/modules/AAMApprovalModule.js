import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APP   = 'login/GET_APP';

const actions = createActions({
    [GET_APP]: () => {},

});

/* 리듀서 */
const aamApprovalReducer = handleActions(
    {
        [GET_APP]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamApprovalReducer;