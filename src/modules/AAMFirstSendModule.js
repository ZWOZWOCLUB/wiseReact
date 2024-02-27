import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_FIRST_SEND   = 'login/GET_FIRST_SEND';

const actions = createActions({
    [GET_FIRST_SEND]: () => {},

});

/* 리듀서 */
const aamFirstSendReducer = handleActions(
    {
        [GET_FIRST_SEND]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamFirstSendReducer;