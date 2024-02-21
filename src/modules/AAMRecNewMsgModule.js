import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_REC_MESSAGE   = 'login/POST_REC_MESSAGE';

const actions = createActions({
    [POST_REC_MESSAGE]: () => {},

});

/* 리듀서 */
const aamRecNewMsgReducer = handleActions(
    {
        [POST_REC_MESSAGE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamRecNewMsgReducer;

