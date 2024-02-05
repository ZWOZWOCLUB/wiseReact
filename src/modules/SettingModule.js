import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_MEMBERLIST             = 'setting/GET_MEMBERLIST';

const actions = createActions({
    [GET_MEMBERLIST]: () => {}
});

const settingReducer = handleActions(
    {
        [GET_MEMBERLIST]: (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default settingReducer;