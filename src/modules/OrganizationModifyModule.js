import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const PUT_ORGANIZATION_MODIFY = 'organizationChart/PUT_ORGANIZATION_MODIFY';

const actions = createActions({
    [PUT_ORGANIZATION_MODIFY] : () => {},
});

const organizationModifyReducer = handleActions(
    {
        [PUT_ORGANIZATION_MODIFY] : (state, { payload }) => {
            return payload;
        },
    }, initialState
);

export default organizationModifyReducer;