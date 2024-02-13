import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_DOCUMENT_FILE = 'settingMember/POST_DOCUMENT_FILE';
export const PUT_DOCUMENT_FILE = 'settingMember/PUT_DOCUMENT_FILE';
export const DELETE_DOCUMENT_FILE = 'settingMember/DELETE_DOCUMENT_FILE';

const actions = createActions({
    [POST_DOCUMENT_FILE]: () => { },
    [PUT_DOCUMENT_FILE]: () => { },
    [DELETE_DOCUMENT_FILE]: () => { },
});

const settingDocumentReducer = handleActions(
    {
        [POST_DOCUMENT_FILE]: (state, { payload }) => {
            return payload;
        },
        [PUT_DOCUMENT_FILE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_DOCUMENT_FILE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default settingDocumentReducer;