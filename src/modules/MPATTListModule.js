import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ATT_LIST   = 'login/GET_ATT_LIST';

const actions = createActions({
    [GET_ATT_LIST]: () => {},

});

/* 리듀서 */
const mpATTListReducer = handleActions(
    {
        [GET_ATT_LIST]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpATTListReducer;

