import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_ATTENDANCE_DATE_INFO = "attendance/GET_ATTENDANCE_DATE_INFO";
export const POST_ATTENDANCE_START = "attendance/POST_ATTENDANCE_START";
export const PUT_ATTENDANCE_END = "attendance/PUT_ATTENDANCE_END";
export const PUT_RECOVERY_ROLE = "attendance/PUT_ATTENDANCE_END";
export const GET_PROXY_INFO = 'attendance/GET_PROXY_INFO'

const actions = createAction({
  [GET_ATTENDANCE_DATE_INFO]: () => {},
  [POST_ATTENDANCE_START]: () => {},
  [PUT_ATTENDANCE_END]: () => {},
  [PUT_RECOVERY_ROLE]: () => {},
    [GET_PROXY_INFO]: () => {},
});

const attendanceInfoReducer = handleActions(
  {
    [GET_ATTENDANCE_DATE_INFO]: (state, { payload }) => {
      return payload;
    },
    [POST_ATTENDANCE_START]: (state, { payload }) => {
      return payload;
    },
    [PUT_ATTENDANCE_END]: (state, { payload }) => {
      return payload;
    },
    [PUT_RECOVERY_ROLE]: (state, { payload }) => {
      return payload;
    },
      [GET_PROXY_INFO]: (state, { payload }) => {
          return payload;
      },
  },
  initialState
);

export default attendanceInfoReducer;
