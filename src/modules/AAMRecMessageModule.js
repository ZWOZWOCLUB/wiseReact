import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_REC_MESSAGE   = 'login/GET_REC_MESSAGE';

const actions = createActions({
    [GET_REC_MESSAGE]: () => {},

});

/* 리듀서 */
const aamRecMessageReducer = handleActions(
    {
        [GET_REC_MESSAGE]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamRecMessageReducer;

