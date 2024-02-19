import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SEARCH_DAY = 'settingMember/POST_SEARCH_DAY';

const actions = createActions({
    [POST_SEARCH_DAY]: () => { },
    
});

const scheduleSearchValueReducer = handleActions(
    {
        [POST_SEARCH_DAY]: (state, { payload }) => {
            return payload;
        },
        
    },
    initialState
);

export default scheduleSearchValueReducer;