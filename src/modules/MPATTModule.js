import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_ATT   = 'login/GET_ATT';

const actions = createActions({
    [GET_ATT]: () => {},

});

/* 리듀서 */
const mpATTReducer = handleActions(
    {
        [GET_ATT]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpATTReducer;

