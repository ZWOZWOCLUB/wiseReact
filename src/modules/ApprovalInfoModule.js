import { createAction, handleActions } from 'redux-actions';

const initialState = [];

export const GET_APPROVAL_INFO = 'approval/GET_APROVAL_INFO';

const actions = createAction({
    [GET_APPROVAL_INFO]: () => {},
});

const approvalInfoReducer = handleActions(
    {
        [GET_APPROVAL_INFO]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default approvalInfoReducer;
