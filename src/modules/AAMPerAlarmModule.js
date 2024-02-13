import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_PERALARM   = 'login/GET_PERALARM';

const actions = createActions({
    [GET_PERALARM]: () => {},

});

/* 리듀서 */
const aamPerAlarmReducer = handleActions(
    {
        [GET_PERALARM]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamPerAlarmReducer;

