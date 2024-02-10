import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SALAY_FILE = 'settingMember/POST_SALAY_FILE';
export const PUT_SALAY_FILE = 'settingMember/PUT_SALAY_FILE';

const actions = createActions({
    [POST_SALAY_FILE]: () => { },
    [PUT_SALAY_FILE]: () => { },
});

const settingSalaryReducer = handleActions(
    {
        [POST_SALAY_FILE]: (state, { payload }) => {
            return payload;
        },
        [PUT_SALAY_FILE]: (state, { payload }) => {
            return payload;
        },

    },
    initialState
);

export default settingSalaryReducer;