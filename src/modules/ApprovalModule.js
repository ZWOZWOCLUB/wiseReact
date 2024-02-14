import { createActions, handleActions } from 'redux-actions';

// 초기값은 빈 배열
const initialState = [];

// 액션
export const GET_RECIEVE_APPROVAL = 'approval/GET_RECIEVE_APPROVAL';
export const GET_SEND_APPROVAL = 'approval/GET_SEND_APPROVAL';
export const POST_APPROVAL_ANNUAL = 'approval/POST_APPROVAL_ANNUAL';
export const POST_APPROVAL_COMMUTE = 'approval/POST_APPROVAL_COMMUTE';
export const POST_APPROVAL_SCHEDULE = 'approval/POST_APPROVAL_SCHEDULE';
export const POST_APPROVAL_RETIRED = 'approval/POST_APPROVAL_RETIRED';
export const POST_APPROVAL_REQ_DOCUMENT = 'approval/POST_APPROVAL_REQ_DOCUMENT';
export const PUT_APPROVAL_COMPLTE = 'approval/PUT_APPROVAL_COMPLETE';
export const PUT_APPROVAL_ROLE_UPDATE = 'approval/PUT_APPROVAL_ROLE_UPDATE';
export const PUT_APPROVAL_ROLE_RECOVERY = 'approval/PUT_APPROVAL_ROLE_RECOVERY';
export const GET_APPROVAL_MEMBER_INFO = 'approval/GET_APPROVAL_MEMBER_INFO';
export const GET_APPROVAL_ATTACHMENT_INFO = 'approval/GET_APPROVAL_ATTACHMENT_INFO';


const actions = createActions({
    [GET_RECIEVE_APPROVAL]: () => {},
    [GET_SEND_APPROVAL]: () => {},
    [POST_APPROVAL_ANNUAL]: () => {},
    [POST_APPROVAL_COMMUTE]: () => {},
    [POST_APPROVAL_SCHEDULE]: () => {},
    [POST_APPROVAL_RETIRED]: () => {},
    [POST_APPROVAL_REQ_DOCUMENT]: () => {},
    [PUT_APPROVAL_COMPLTE]: () => {},
    [PUT_APPROVAL_ROLE_UPDATE]: () => {},
    [PUT_APPROVAL_ROLE_RECOVERY]: () => {},
    [GET_APPROVAL_MEMBER_INFO]: () => {},
    [GET_APPROVAL_ATTACHMENT_INFO]: () => {},
});

// 리듀서
const approvalReducer = handleActions(
    {
        [GET_RECIEVE_APPROVAL]: (state, { payload }) => {
            return payload;
        },
        [GET_SEND_APPROVAL]: (state, { payload }) => {
            return payload;
        },
        [POST_APPROVAL_ANNUAL]: (state, { payload }) => {
            return payload;
        },
        [POST_APPROVAL_COMMUTE]: (state, { payload }) => {
            return payload;
        },
        [POST_APPROVAL_SCHEDULE]: (state, { payload }) => {
            return payload;
        },
        [POST_APPROVAL_RETIRED]: (state, { payload }) => {
            return payload;
        },
        [POST_APPROVAL_REQ_DOCUMENT]: (state, { payload }) => {
            return payload;
        },
        [PUT_APPROVAL_COMPLTE]: (state, { payload }) => {
            return payload;
        },
        [PUT_APPROVAL_ROLE_UPDATE]: (state, { payload }) => {
            return payload;
        },
        [PUT_APPROVAL_ROLE_RECOVERY]: (state, { payload }) => {
            return payload;
        },
        [GET_APPROVAL_MEMBER_INFO]: (state, { payload }) => {
            return payload;
        },
        [GET_APPROVAL_ATTACHMENT_INFO]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default approvalReducer;
