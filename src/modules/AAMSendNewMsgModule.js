import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_MESSAGE   = 'login/POST_MESSAGE';

const actions = createActions({
    [POST_MESSAGE]: () => {},

});

/* 리듀서 */
const aamSendNewMsgReducer = handleActions(
    {
        [POST_MESSAGE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamSendNewMsgReducer;

