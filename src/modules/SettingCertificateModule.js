import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_CERTIFICATE = 'settingMember/POST_CERTIFICATE';
export const PUT_CERTIFICATE = 'settingMember/PUT_CERTIFICATE';
export const DELETE_CERTIFICATE = 'settingMember/DELETE_CERTIFICATE';
export const POST_CERTIFICATE_FILE = 'settingMember/POST_CERTIFICATE_FILE';
export const PUT_CERTIFICATE_FILE = 'settingMember/PUT_CERTIFICATE_FILE';
export const DELETE_CERTIFICATE_FILE = 'settingMember/DELETE_CERTIFICATE_FILE';

const actions = createActions({
    [POST_CERTIFICATE]: () => { },
    [PUT_CERTIFICATE]: () => { },
    [DELETE_CERTIFICATE]: () => { },
    [POST_CERTIFICATE_FILE]: () => { },
    [PUT_CERTIFICATE_FILE]: () => { },
    [DELETE_CERTIFICATE_FILE]: () => { },
});

const settingCertificateReducer = handleActions(
    {

        [POST_CERTIFICATE]: (state, { payload }) => {
            return payload;
        },
        [PUT_CERTIFICATE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_CERTIFICATE]: (state, { payload }) => {
            return payload;
        },
        [POST_CERTIFICATE_FILE]: (state, { payload }) => {
            return payload;
        },
        [PUT_CERTIFICATE_FILE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_CERTIFICATE_FILE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default settingCertificateReducer;