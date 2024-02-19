import { createAction, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORGANIZATION_REFLIST = 'organizationChart/GET_ORGANIZATION_ITEM';

const actions = createAction({
    [GET_ORGANIZATION_REFLIST] : () => {},
});

const organizationItemReducer = handleActions(
    {
        [GET_ORGANIZATION_REFLIST] : (state, {payload}) =>{
            return payload;
        },

    }, initialState
);

export default organizationItemReducer;