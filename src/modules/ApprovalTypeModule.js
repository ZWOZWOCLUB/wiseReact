import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_APPROVAL_TYPE_INFO = 'approval/GET_APPROVAL_TYPE_INFO';

const actions = createAction({
    [GET_APPROVAL_TYPE_INFO]: () => {},
});

const approvalTypeReducer = handleActions(
    {
        [GET_APPROVAL_TYPE_INFO]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default approvalTypeReducer;
