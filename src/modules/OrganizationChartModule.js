import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_ORGANIZATION_TREE = 'organizationChart/GET_ORGANIZATION_TREE';
export const GET_ORGANIZATION_CARD = 'organizationChart/GET_ORGANIZATION_CARD'; //organizationChart.js
export const PUT_ORGANIZATION_EDIT = 'organizationChart/GET_ORGANIZATION_EDIT';
export const PUT_ORGANIZATION_CREATE = 'organizationChart/GET_ORGANIZATION_CREATE';

const actions = createActions({
    [GET_ORGANIZATION_TREE] : () => {},
    [GET_ORGANIZATION_CARD] : () => {},
    [PUT_ORGANIZATION_EDIT] : () => {},
    [PUT_ORGANIZATION_CREATE] : () => {}

});

const organizationChartReducer = handleActions(
    {
        [GET_ORGANIZATION_TREE] : (state, {payload}) => {
            return payload;
        },

        [GET_ORGANIZATION_CARD] : (state, {payload}) => {
            return payload;
        },

        [PUT_ORGANIZATION_EDIT] : (state, {payload}) => {
            return payload;
        },

        [PUT_ORGANIZATION_CREATE] : (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default organizationChartReducer;
