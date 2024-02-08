import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_MEMBERADD             = 'settingMember/POST_MEMBERADD';
export const PUT_MEMBERADD              = 'settingMember/PUT_MEMBERADD';
export const POST_CERTIFICATE           = 'settingMember/POST_CERTIFICATE'

const actions = createActions({
    [POST_MEMBERADD]: () => {},
    [PUT_MEMBERADD]: () => {},
    [POST_CERTIFICATE]: () => {},
});

const settingMemberReducer = handleActions(
    {
        [POST_MEMBERADD]: (state, { payload }) => {
            return payload;
        },
        [PUT_MEMBERADD]: (state, { payload }) => {
            return payload;
        },        
        [POST_CERTIFICATE]: (state, { payload }) => {
            return payload;
        },

    },
    initialState
);

export default settingMemberReducer;