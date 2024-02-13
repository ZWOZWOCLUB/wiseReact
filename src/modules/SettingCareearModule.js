import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_CAREEAR = 'settingMember/POST_CAREEAR';
export const PUT_CAREEAR = 'settingMember/PUT_CAREEAR';
export const DELETE_CAREEAR = 'settingMember/DELETE_CAREEAR';
export const POST_CAREEAR_FILE = 'settingMember/POST_CAREEAR_FILE';
export const PUT_CAREEAR_FILE = 'settingMember/PUT_CAREEAR_FILE';
export const DELETE_CAREEAR_FILE = 'settingMember/DELETE_CAREEAR_FILE';

const actions = createActions({
    [POST_CAREEAR]: () => { },
    [PUT_CAREEAR]: () => { },
    [DELETE_CAREEAR]: () => { },
    [POST_CAREEAR_FILE]: () => { },
    [PUT_CAREEAR_FILE]: () => { },
    [DELETE_CAREEAR_FILE]: () => { },
});

const settingCareerReducer = handleActions(
    {
        [POST_CAREEAR]: (state, { payload }) => {
            return payload;
        },
        [PUT_CAREEAR]: (state, { payload }) => {
            return payload;
        },
        [DELETE_CAREEAR]: (state, { payload }) => {
            return payload;
        },
        [POST_CAREEAR_FILE]: (state, { payload }) => {
            return payload;
        },
        [PUT_CAREEAR_FILE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_CAREEAR_FILE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default settingCareerReducer;