import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ALLALARM   = 'login/GET_ALLALARM';

const actions = createActions({
    [GET_ALLALARM]: () => {},

});

/* 리듀서 */
const aamAllAlarmReducer = handleActions(
    {
        [GET_ALLALARM]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamAllAlarmReducer;

