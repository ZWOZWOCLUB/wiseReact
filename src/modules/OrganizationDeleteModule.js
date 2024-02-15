import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_ORGANIZATION_DELETE = 'organizationChart/PUT_ORGANIZATION_DELETE';

const actions = createActions({
    [PUT_ORGANIZATION_DELETE] : () => {},
});

const organizationDeleteReducer = handleActions(
    {
        [PUT_ORGANIZATION_DELETE] : (state, { payload }) => {
            return payload;
        },
    }, initialState
);

export default organizationDeleteReducer;
