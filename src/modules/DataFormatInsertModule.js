import { createActions, handleActions } from "redux-actions";


const initialState = [];

export const POST_DATAFORMAT_DATA = 'dataformat/POST_DATAFORMAT_DATA';

const actions = createActions({
    [POST_DATAFORMAT_DATA]: () => {},
});

const dataFormatInsertReducer = handleActions(
    {
        [POST_DATAFORMAT_DATA]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default dataFormatInsertReducer;