import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const PUT_ALARM_CHECK   = 'login/PUT_ALARM_CHECK';

const actions = createActions({
    [PUT_ALARM_CHECK]: () => {},

});

/* 리듀서 */
const aamPutAlarmReducer = handleActions(
    {
        [PUT_ALARM_CHECK]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default aamPutAlarmReducer;

