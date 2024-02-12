import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SALAY = 'settingMember/POST_SALAY';
export const PUT_SALAY = 'settingMember/PUT_SALAY';
export const DELETE_SALAY = 'settingMember/DELETE_SALAY';
export const POST_SALAY_FILE = 'settingMember/POST_SALAY_FILE';
export const PUT_SALAY_FILE = 'settingMember/PUT_SALAY_FILE';
export const DELETE_SALAY_FILE = 'settingMember/DELETE_SALAY_FILE';

const actions = createActions({
    [POST_SALAY]: () => { },
    [PUT_SALAY]: () => { },
    [DELETE_SALAY]: () => { },
    [POST_SALAY_FILE]: () => { },
    [PUT_SALAY_FILE]: () => { },
    [DELETE_SALAY_FILE]: () => { },
});

const settingSalaryReducer = handleActions(
    {
        [POST_SALAY]: (state, { payload }) => {
            return payload;
        },
        [PUT_SALAY]: (state, { payload }) => {
            return payload;
        },
        [DELETE_SALAY]: (state, { payload }) => {
            return payload;
        },
        [POST_SALAY_FILE]: (state, { payload }) => {
            return payload;
        },
        [PUT_SALAY_FILE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_SALAY_FILE]: (state, { payload }) => {
            return payload;
        },

    },
    initialState
);

export default settingSalaryReducer;