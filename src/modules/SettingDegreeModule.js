import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_DEGREE = 'settingMember/POST_DEGREE';
export const PUT_DEGREE = 'settingMember/PUT_DEGREE';
export const POST_DEGREE_FILE = 'settingMember/POST_DEGREE_FILE';
export const PUT_DEGREE_FILE = 'settingMember/PUT_DEGREE_FILE';
export const DELETE_DEGREE_FILE = 'settingMember/DELETE_DEGREE_FILE';

const actions = createActions({
    [POST_DEGREE]: () => { },
    [PUT_DEGREE]: () => { },
    [POST_DEGREE_FILE]: () => { },
    [PUT_DEGREE_FILE]: () => { },
    [DELETE_DEGREE_FILE]: () => { },
});

const settingDegreeReducer = handleActions(
    {
        [POST_DEGREE]: (state, { payload }) => {
            return payload;
        },
        [PUT_DEGREE]: (state, { payload }) => {
            return payload;
        },
        [POST_DEGREE_FILE]: (state, { payload }) => {
            return payload;
        },
        [PUT_DEGREE_FILE]: (state, { payload }) => {
            return payload;
        },
        [DELETE_DEGREE_FILE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default settingDegreeReducer;