import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORGANIZATION_EDIT = 'organizationChart/GET_ORGANIZATION_EDIT';
export const PUT_ORGANIZATION_UPDATE = 'organizationChart/PUT_ORGANIZATION_UPDATE';
// export const GET_ORGANIZATION_SEARCH_NAME = 'organizationChart/GET_ORGANIZATION_SEARCH_NAME';

const actions = createActions({
    [GET_ORGANIZATION_EDIT] : () => {},
    [PUT_ORGANIZATION_UPDATE] : () => {},
    // [GET_ORGANIZATION_SEARCH_NAME] : () => {},

});

const organizationEditReducer = handleActions(
    {

        [GET_ORGANIZATION_EDIT] : (state, {payload}) => {
            return payload;
        },

        [PUT_ORGANIZATION_UPDATE] : (state, {payload}) => {
            return payload;
        },

        // [GET_ORGANIZATION_SEARCH_NAME] : (state, {payload}) => {
        //     return payload;
        // },

    },
    initialState
);

export default organizationEditReducer;
