import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_DOC   = 'login/GET_DOC';

const actions = createActions({
    [GET_DOC]: () => {},

});

/* 리듀서 */
const mpDocReducer = handleActions(
    {
        [GET_DOC]: (state, { payload }) => {
            
            return payload;
        },
  
    },
    initialState
);

export default mpDocReducer;

