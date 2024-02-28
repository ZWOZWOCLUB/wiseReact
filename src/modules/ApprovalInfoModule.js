import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_APPROVAL_INFO = 'approval/GET_APROVAL_INFO';
export const GET_APPROVAL_MEMBERR_INFO = 'approval/GET_APPROVAL_MEMBERR_INFO';
export const GET_ATTENDANCE_TODAY_INFO = 'attendance/GET_ATTENDANCE_TODAY_INFO';
export const GET_DEP_MEMBER_INFO = 'approval/GET_DEP_MEMBER_INFO';
export const POST_SEARCH_APPROVAL = 'approval/POST_SEARCH_APPROVAL';
export const PUT_COMMENT_DELETE = 'comment/PUT_COMMENT_DELETE';

const actions = createAction({
    [GET_APPROVAL_INFO]: () => {},
    [GET_APPROVAL_MEMBERR_INFO]: () => {},
    [GET_ATTENDANCE_TODAY_INFO]: () => {},
    [GET_DEP_MEMBER_INFO]: () => {},
    [POST_SEARCH_APPROVAL]: () => {},
    [PUT_COMMENT_DELETE]: () => {},
});

const approvalInfoReducer = handleActions(
    {
        [GET_APPROVAL_INFO]: (state, { payload }) => {
            return payload;
        },
        [GET_APPROVAL_MEMBERR_INFO]: (state, { payload }) => {
            return payload;
        },
        [GET_ATTENDANCE_TODAY_INFO]: (state, { payload }) => {
            return payload;
        },
        [GET_DEP_MEMBER_INFO]: (state, { payload }) => {
            return payload;
        },
        [POST_SEARCH_APPROVAL]: (state, { payload }) => {
            return payload;
        },
        [PUT_COMMENT_DELETE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default approvalInfoReducer;
