import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_ORGANIZATION_TREE = 'organizationChart/GET_ORGANIZATION_TREE';
export const GET_ORGANIZATION_CARD = 'organizationChart/GET_ORGANIZATION_CARD'; //organizationChart.js
// export const GET_ORGANIZATION_EDIT = 'organizationChart/GET_ORGANIZATION_EDIT';
export const POST_ORGANIZATION_CREATE = 'organizationChart/POST_ORGANIZATION_CREATE';
export const PUT_ORGANIZATION_DELETE = 'organizationChart/PUT_ORGANIZATION_DELETE';
export const PUT_ORGANIZATION_MODIFY = 'organizationChart/PUT_ORGANIZATION_MODIFY';
export const PUT_ORGANIZATION_UPDATEROLE = 'organizationChart/PUT_ORGANIZATION_UPDATEROLE';


const actions = createActions({
    [GET_ORGANIZATION_TREE] : () => {},
    [GET_ORGANIZATION_CARD] : () => {},
    // [GET_ORGANIZATION_EDIT] : () => {},
    [POST_ORGANIZATION_CREATE] : () => {},
    [PUT_ORGANIZATION_DELETE] : () => {},
    [PUT_ORGANIZATION_MODIFY] : () => {},
    [PUT_ORGANIZATION_UPDATEROLE] : () => {},


});

const organizationChartReducer = handleActions(
    {
        [GET_ORGANIZATION_TREE] : (state, {payload}) => {
            return payload;
        },

        [GET_ORGANIZATION_CARD] : (state, {payload}) => {
            return payload;
        },

        // [GET_ORGANIZATION_EDIT] : (state, {payload}) => {
        //     return payload;
        // },
        [POST_ORGANIZATION_CREATE] : (state, { payload }) => {
            return payload;
        },

        [PUT_ORGANIZATION_DELETE] : (state, { payload }) => {
            return payload;
        },

        [PUT_ORGANIZATION_MODIFY] : (state, { payload }) => {
            return payload;
        },

        [PUT_ORGANIZATION_UPDATEROLE] : (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default organizationChartReducer;
