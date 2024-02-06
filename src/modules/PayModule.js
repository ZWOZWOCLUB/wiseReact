import { createActions, handleActions } from 'redux-actions';

const intitialState = [];

export const GET_PAYLIST = 'pay/GET_PAYLIST';
export const GET_YEAR = 'pay/GET_YEAR'

const actions = createActions({
    [GET_PAYLIST]: () => {},
    [GET_YEAR]: () => {}
});

const payReducer = handleActions(
    {
        [GET_PAYLIST]: (state, { payload }) => {
            return payload;
        },
        [GET_YEAR]: (state, { payload }) => {
            return payload;
        }

    },
    intitialState
);

export default payReducer;