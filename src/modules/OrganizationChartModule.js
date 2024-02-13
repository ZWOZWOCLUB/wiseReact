import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_ORGANIZATION_TREE = 'organizationChart/GET_ORGANIZATION_TREE';
export const GET_ORGANIZATION_CARD = 'organizationChart/GET_ORGANIZATION_CARD';

const actions = createActions({
    [GET_ORGANIZATION_TREE] : () => {},
    [GET_ORGANIZATION_CARD] : () => {}

});

const organizationChartReducer = handleActions(
    {
        [GET_ORGANIZATION_TREE] : (state, {payload}) => {
            return payload;
        },

        [GET_ORGANIZATION_CARD] : (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default organizationChartReducer;
