import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_DATAFORMAT_ALL = 'dataformat/GET_DATAFORMAT_ALL';
export const POST_DATAFORMAT_DATA = 'dataformat/POST_DATAFORMAT_DATA';

const actions = createActions({
    [GET_DATAFORMAT_ALL]: () => { },
    [POST_DATAFORMAT_DATA]: () => { }
})

const dataFormatReducer = handleActions(
    {
        [GET_DATAFORMAT_ALL]: (state, { payload }) => {
            return payload;
        },
        [POST_DATAFORMAT_DATA]: (state, { payload }) => {
            return payload;
         },
    },
    initialState
)

export default dataFormatReducer