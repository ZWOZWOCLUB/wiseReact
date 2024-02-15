import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORGANIZATION_EDIT = 'organizationChart/GET_ORGANIZATION_EDIT';

const actions = createActions({
    [GET_ORGANIZATION_EDIT] : () => {},

});

const organizationEditReducer = handleActions(
    {

        [GET_ORGANIZATION_EDIT] : (state, {payload}) => {
            return payload;
        },

    },
    initialState
);

export default organizationEditReducer;
