import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_APPROVAL_TYPE_INFO = 'approval/GET_APPROVAL_TYPE_INFO';
export const POST_ATTENDANCE_SCHEDULE_INFO = 'attendance/POST_ATTENDANCE_SCHEDULE_INFO';
export const POST_SEARCH_SEND_APPROVAL = 'approval/POST_SEARCH_SEND_APPROVAL';

const actions = createAction({
    [GET_APPROVAL_TYPE_INFO]: () => {},
    [POST_ATTENDANCE_SCHEDULE_INFO]: () => {},
    [POST_SEARCH_SEND_APPROVAL]: () => {},
});

const approvalTypeReducer = handleActions(
    {
        [GET_APPROVAL_TYPE_INFO]: (state, { payload }) => {
            return payload;
        },
        [POST_ATTENDANCE_SCHEDULE_INFO]: (state, { payload }) => {
            return payload;
        },
        [POST_SEARCH_SEND_APPROVAL]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default approvalTypeReducer;
