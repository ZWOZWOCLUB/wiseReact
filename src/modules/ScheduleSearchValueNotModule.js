import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const POST_SEARCH_NOTCONTAIN_DAY = 'settingMember/POST_SEARCH_NOTCONTAIN_DAY';

const actions = createActions({
    [POST_SEARCH_NOTCONTAIN_DAY]: () => { },
    
});

const scheduleSearchValueNotReducer = handleActions(
    {
        [POST_SEARCH_NOTCONTAIN_DAY]: (state, { payload }) => {
            return payload;
        },
        
    },
    initialState
);

export default scheduleSearchValueNotReducer;