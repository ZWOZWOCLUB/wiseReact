import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_APPROVAL_COMPLETE_INFO = 'approval/GET_APPROVAL_COMPLETE_INFO';

const actions = createAction({
    [GET_APPROVAL_COMPLETE_INFO]: () => {},
});

const approvalCompleteInfoReducer = handleActions(
    {
        [GET_APPROVAL_COMPLETE_INFO]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default approvalCompleteInfoReducer;
