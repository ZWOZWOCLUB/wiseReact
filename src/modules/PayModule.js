import { createActions, handleActions } from 'redux-actions';

const intitialState = [];

export const GET_PAYLIST = 'pay/GET_PAYLIST';

const actions = createActions({
    [GET_PAYLIST]: () => {}
});

const payReducer = handleActions(
    {
        [GET_PAYLIST]: (state, { payload }) => {
            return payload;
        }

    },
    intitialState
);

export default payReducer;