import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const GET_DATAFORMAT_ALL = 'dataformat/GET_DATAFORMAT_ALL';
export const PUT_DATAFORMAT_DELETE = 'dataformat/PUT_DATAFORMAT_DELETE';

const actions = createActions({
    [GET_DATAFORMAT_ALL]: () => {},
    [PUT_DATAFORMAT_DELETE]: () => {},
});

const dataFormatReducer = handleActions(
    {
        [GET_DATAFORMAT_ALL]: (state, { payload }) => {
            return payload;
        },
        [PUT_DATAFORMAT_DELETE]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default dataFormatReducer