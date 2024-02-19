import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_ATTENDANCE_DATE_INFO = 'attendance/GET_ATTENDANCE_DATE_INFO';

const actions = createAction({
    [GET_ATTENDANCE_DATE_INFO]: () => {},
});

const attendanceInfoReducer = handleActions(
    {
        [GET_ATTENDANCE_DATE_INFO]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default attendanceInfoReducer;
