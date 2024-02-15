import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_ORGANIZATION_MEMBER = 'organizationChart/GET_ORGANIZATION_MEMBER';

const actions = createActions({
    [GET_ORGANIZATION_MEMBER] : () => {},
});

const organizationMemberReducer = handleActions(
    {
        [GET_ORGANIZATION_MEMBER] : (state, {payload}) => {
            return payload;
        },
    }, initialState
);

export default organizationMemberReducer;