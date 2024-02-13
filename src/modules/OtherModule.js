import { createActions, handleActions } from 'redux-actions';

const intitialState = [];

export const GET_YEAR                   = 'pay/GET_YEAR';
export const GET_POSITION               = 'setting/GET_POSITION';


const actions = createActions({
    [GET_YEAR]: () => {},
    [GET_POSITION]: () => {},
});

const otherReducer = handleActions(
    {
        [GET_YEAR]: (state, { payload }) => {
            return payload;
        },
        [GET_POSITION]: (state, { payload }) => {
            return payload;
        }

    },
    intitialState
);

export default otherReducer;