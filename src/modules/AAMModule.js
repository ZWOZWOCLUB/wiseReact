import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const PUT_MSG_CHECK   = 'login/PUT_MSG_CHECK';

const actions = createActions({
    [PUT_MSG_CHECK]: () => {},

});

/* 리듀서 */
const aamPutReducer = handleActions(
    {
        [PUT_MSG_CHECK]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamPutReducer;

