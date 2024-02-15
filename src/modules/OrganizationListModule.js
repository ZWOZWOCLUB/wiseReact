import { createAction, handleActions } from "redux-actions";

const initialState = [];


export const GET_ORGANIZATION_LIST = 'organizationChart/GET_ORGANIZATION_LIST';

const actions = createAction({
    [GET_ORGANIZATION_LIST] : () => {},
});

const organizationListReducer = handleActions(
    {
        [GET_ORGANIZATION_LIST] : (state, {payload}) =>{
            return payload;
        },

    }, initialState
);

export default organizationListReducer;