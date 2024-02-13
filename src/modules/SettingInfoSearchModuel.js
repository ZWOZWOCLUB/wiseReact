import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_INFO_SEARCH = 'settingMember/GET_INFO_SEARCH';

const actions = createActions({
    [GET_INFO_SEARCH]: () => { },
});

const settingInfoSearchReducer = handleActions(
    {
        [GET_INFO_SEARCH]: (state, { payload }) => {
            return payload;
        },

    },
    initialState
);

export default settingInfoSearchReducer;