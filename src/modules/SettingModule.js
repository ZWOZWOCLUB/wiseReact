import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_MEMBERLIST             = 'setting/GET_MEMBERLIST';
export const GET_DEPARTMENTLIST         = 'setting/GET_DEPARTMENTLIST';
export const POST_MEMBERADD             = 'setting/POST_MEMBERADD';

const actions = createActions({
    [GET_MEMBERLIST]: () => {},
    [GET_DEPARTMENTLIST]: () => {},
    [POST_MEMBERADD]: () => {},
});

const settingReducer = handleActions(
    {
        [GET_MEMBERLIST]: (state, { payload }) => {
            return payload;
        },
        [GET_DEPARTMENTLIST]: (state, { payload }) => {
            return payload;
        },
        [POST_MEMBERADD]: (state, { payload }) => {
            return payload;
        }

    },
    initialState
);

export default settingReducer;