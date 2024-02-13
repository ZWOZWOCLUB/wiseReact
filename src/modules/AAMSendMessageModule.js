import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SEND_MESSAGE   = 'login/GET_SEND_MESSAGE';

const actions = createActions({
    [GET_SEND_MESSAGE]: () => {},

});

/* 리듀서 */
const aamSendMessageReducer = handleActions(
    {
        [GET_SEND_MESSAGE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamSendMessageReducer;

