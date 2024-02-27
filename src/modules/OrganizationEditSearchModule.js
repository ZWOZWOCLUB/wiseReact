import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORGANIZATION_SEARCH_NAME = 'organizationChart/GET_ORGANIZATION_SEARCH_NAME';

const actions = createActions({
    [GET_ORGANIZATION_SEARCH_NAME] : () => {},
});

const organizationEditSearchReducer = handleActions({
    
        [GET_ORGANIZATION_SEARCH_NAME] : (state, {payload}) => {
            return payload;
        },

    },
initialState
);

export default organizationEditSearchReducer;