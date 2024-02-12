import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_MEMBERADD = 'settingMember/POST_MEMBERADD';
export const PUT_MEMBERADD = 'settingMember/PUT_MEMBERADD';
export const PUT_MEMBER_VACATION = 'settingMember/PUT_MEMBER_VACATION';

const actions = createActions({
    [POST_MEMBERADD]: () => { },
    [PUT_MEMBERADD]: () => { },
    [PUT_MEMBER_VACATION]: () => { },
});

const settingMemberReducer = handleActions(
    {
        [POST_MEMBERADD]: (state, { payload }) => {
            return payload;
        },
        [PUT_MEMBERADD]: (state, { payload }) => {
            return payload;
        },
        [PUT_MEMBER_VACATION]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default settingMemberReducer;