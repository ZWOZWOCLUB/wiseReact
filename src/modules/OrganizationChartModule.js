import { createActions, handleActions } from "redux-actions";

const initialState = [];


export const GET_ORGANIZATION_TREE = 'organizationChart/GET_ORGANIZATION_TREE';

const actions = createActions({
    [GET_ORGANIZATION_TREE] : () => {}
});

const organizationChartReducer = handleActions(
    {
        [GET_ORGANIZATION_TREE] : (state, {payload}) => {
            return payload;
        }
    },
    initialState
);

export default organizationChartReducer;
