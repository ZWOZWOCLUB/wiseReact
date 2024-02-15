import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_ORGANIZATION_CREATE = 'organizationChart/POST_ORGANIZATION_CREATE';

const actions = createActions({
    [POST_ORGANIZATION_CREATE] : () => {},
});

const organizationCreateReducer = handleActions(
    {
        [POST_ORGANIZATION_CREATE] : (state, { payload }) => {
            return payload;
        },
    }, initialState
);

export default organizationCreateReducer;